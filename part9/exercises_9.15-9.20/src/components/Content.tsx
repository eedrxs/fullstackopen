import type { CoursePart } from "../App";
import Part from "./Part";

const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </>
  );
};

export default Content;

interface ContentProps {
  parts: CoursePart[];
}
