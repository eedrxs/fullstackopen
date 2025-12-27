import { HealthCheckRating } from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { assertNever } from "../../utils";

const HealthRating = ({ rating }: Props) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteIcon style={{ color: "red" }} />;
    default:
      return assertNever(rating);
  }
};

export default HealthRating;

interface Props {
  rating: HealthCheckRating;
}
