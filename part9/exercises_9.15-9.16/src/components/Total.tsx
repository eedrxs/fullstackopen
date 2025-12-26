const Total = ({ total }: TotalProps) => {
  return (
    <p>
        Number of exercises {total}
      </p>
  );
}

export default Total;

interface TotalProps {
  total: number;
}