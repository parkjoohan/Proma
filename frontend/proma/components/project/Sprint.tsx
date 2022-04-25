//스프린트 컴포넌트
import Team from "./Team";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { ThemeType } from "../../interfaces/style";

//더미 데이터
const teamData = [
  {
    teamNo: 0,
    teamName: "frontend",
    projectNo: 10,
  },
  {
    teamNo: 1,
    teamName: "backend",
    projectNo: 10,
  },
  {
    teamNo: 2,
    teamName: "db",
    projectNo: 10,
  },
  {
    teamNo: 3,
    teamName: "deploy",
    projectNo: 10,
  },
];

//styled-components
const Title = styled.h2`
  color: ${(props: ThemeType) => props.theme.textColor};
  font-weight: 600;
`;

const SprintBox = styled.div`
  margin-top: 20px;
  border-radius: 3px;
  background-color: ${(props: ThemeType) => props.theme.subPurpleColor};
  padding: 10px 30px 20px 30px;
  color: ${(props: ThemeType) => props.theme.textColor};
`;
const TeamBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
`;
const FlexBox = styled.div`
  width: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FilledButton = styled.button`
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
  padding: 5px 10px;
  background-color: ${(props: ThemeType) => props.theme.mainColor};
  color: white;
  border: none;
  border-radius: 3px;
`;

interface SprintType {
  sprintNo: number;
  sprintName: string;
}

const Sprint = ({ sprint }: { sprint: SprintType }) => {
  const [inProgress, setInProgress] = useState<boolean>(false);

  return (
    <SprintBox>
      <FlexBox>
        <Title>{sprint.sprintName}</Title>
        <FilledButton onClick={() => setInProgress((cur) => !cur)}>
          {inProgress ? "Finish Sprint" : "Start Sprint"}
        </FilledButton>
      </FlexBox>
      <TeamBox>
        {teamData.map((team, index) => (
          <Team team={team} key={index} sprintName={sprint.sprintName} />
        ))}
      </TeamBox>
    </SprintBox>
  );
};

export default Sprint;
