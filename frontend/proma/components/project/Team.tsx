//해당 스프린트 내 팀 컴포넌트
import Issue from "./Issue";
import styled from "styled-components";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

//더미 데이터
const issueData = [
  {
    issueNo: 0,
    issueTitle: "컴포넌트 구성",
    description: "컴포넌트 구성합니다.",
    assignee: "Sue",
  },
  {
    issueNo: 1,
    issueTitle: "db 설계",
    description: "db 설계합니다.",
    assignee: "Eus",
  },
];

//styled-components
const TeamBox = styled.div`
  border-radius: 10px;
  background-color: #bfb9c7;
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
`;

const TeamName = styled.a`
  color: white;
  &: hover {
    cursor: pointer;
    color: black;
  }
`;

const AddButton = styled.button`
  background-color: inherit;
  text-decoration: underline;
  border: none;
  font-size: 15px;
  align-self: end;
  padding: 10px;
  &:hover {
    cursor: pointer;
    color: white;
  }
`;

interface TeamType {
  teamNo: number;
  teamName: string;
}

const Team = ({ team, sprintName }: { team: TeamType; sprintName: string }) => {
  //DOM 준비되었을 때 렌더링
  const [isReady, setIsReady] = useState<boolean>(false);
  useEffect(() => {
    setIsReady(true);
  }, []);

  //팀 별 이슈 get api 로직 필요

  //해당 스프린트 해당 팀의 새로운 이슈 생성 로직
  const addNewIssue = () => {};

  const droppableId = `${sprintName}_${team.teamName}`;

  return (
    <>
      {isReady ? (
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <TeamBox ref={provided.innerRef} {...provided.droppableProps}>
              <Link href={`/project/team/${team.teamNo}`}>
                <TeamName>
                  <h2>{team.teamName}</h2>
                </TeamName>
              </Link>
              {issueData.map((issue, index) => (
                <Issue issue={issue} key={index} droppableId={droppableId}/>
              ))}
              {provided.placeholder}
              <AddButton onClick={addNewIssue}>+ Add Issue</AddButton>
            </TeamBox>
          )}
        </Droppable>
      ) : null}
    </>
  );
};

export default Team;
