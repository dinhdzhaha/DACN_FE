import React, { useState } from 'react';
import styled from '@emotion/styled';
import { columnsFromBackend } from './KanbanData';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { showToastMessageError,showToastMessageSuccess } from "../../../components/toast";
import axios from "axios";


//nếu time còn dưới 5 ngày là sắp tới hạn, và màu thì màu vàng
const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  width: 304px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 10px;
  background-color: #fff;
  opacity: ${(props) => (props.isComplete? 0.6 : 1)};
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const Kanban = () => {
  const userAuth = JSON.parse(localStorage.getItem("userAuth"));
  const baseURL = import.meta.env.VITE_API_URL;
  const yourConfig = {
    headers: {
      Authorization: "Bearer " + userAuth?.token
    }
  };
  const handleStatus=(title)=>{
    if(title==="Chưa thực hiện")
    {
      return "todo";
    }
    else if(title==="Đang thực hiện")
    {
      return "doing";
    }
    else if(title==="Đã xong")
    {
      return "done";
    }
    else if(title==="Đã nhận")
    {
      return "complete";
    }
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const init={ ...columns };
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      removed.index=destination.index;
      removed.status=handleStatus(destColumn.title);
      let body=
      {
        "id": removed.id,
        "status": handleStatus(destColumn.title)
      }
      await axios.put(`${baseURL}api/Task/UpdateStatusTask`,body,yourConfig)
      .then((res)=>{
        console.log(removed);
        console.log(res.data);
        removed.completeDate=res.data.completeDate;
        removed.doneDate=res.data.doneDate;
        showToastMessageSuccess("Cập nhật trạng thái thành công!");
      })
      .catch((err)=>{
        setColumns(init);
        showToastMessageError("Cập nhật trạng thái không thành công!");
        return;
      })
      destItems.splice(destination.index, 0, removed);
      const listUpdate1=destItems.map((item, index) => ({
        id: item.id,
        index: index,
      }));
      const listUpdate2=sourceItems.map((item, index) => ({
        id: item.id,
        index: index,
      }));
      body={
        "listInputs": [...listUpdate1, ...listUpdate2]
      }
      axios.put(`${baseURL}api/Task/UpdateTasksIndex`,body,yourConfig)
      .then((res)=>{
      })
      .catch((err)=>{
        setColumns(init);
        showToastMessageError("Cập nhật trạng thái không thành công!");
        console.log(err);
        return;
      })
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const init={ ...columns };
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
        if(source.index!=destination.index)
        {
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        const update={
          ...columns,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        };
        const listUpdate=update[source.droppableId].items.map((item, index) => ({
          id: item.id,
          index: index,
        }));
        const body={
          "listInputs": listUpdate
        }
        axios.put(`${baseURL}api/Task/UpdateTasksIndex`,body,yourConfig)
        .then((res)=>{
          showToastMessageSuccess("Cập nhật thành công!");
        })
        .catch((err)=>{
          console.log(err);
          setColumns(init);
          showToastMessageError("Cập nhật không thành công!");
          return;
        })
        setColumns(update);
      }
    }
  };
  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <Container>
        <TaskColumnStyles>
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Droppable key={columnId} droppableId={columnId}>
                {(provided, snapshot) => (
                  <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isComplete={column.title === "Đã nhận" ? true : false}
                  >
                    <Title>{column.title}</Title>
                    {column.items.map((item, index) => (
                      <TaskCard key={index} item={item} index={index}/>
                    ))}
                    {provided.placeholder}
                  </TaskList>
                )}
              </Droppable>
            );
          })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
};

export default Kanban;
