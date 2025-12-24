const Content = ({ parts }: ContentProps) => {
  return (
    <>
      {parts.map((part) => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );
};

export default Content;

interface ContentProps {
  parts: {
    name: string;
    exerciseCount: number;
  }[];
}
