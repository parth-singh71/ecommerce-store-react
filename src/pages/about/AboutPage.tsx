import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import "./styles.scss";

const AboutPage = () => {
  return (
    <>
      <Container>
        <Card
          sx={{
            minWidth: 275,
            marginX: { xs: 2, sm: 5, md: 25, xl: 30 },
            marginBottom: 2,
            // maxHeight: 200,
          }}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Stack sx={{ flex: 1 }}>
                <Typography
                  variant="h5"
                  component="div"
                  color="text.primary"
                  gutterBottom
                >
                  About us
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // display: cartItem.product.description ? "-webkit-box" : "none",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                  accusamus minus placeat sequi enim, nihil adipisci? Est,
                  harum? Eligendi ipsam aperiam vel modi ducimus non assumenda
                  odit saepe vitae reiciendis! Natus non commodi earum
                  voluptatum iusto a perspiciatis totam explicabo rem
                  praesentium, tempore consequatur fugiat ab soluta quidem vero
                  id, dolores inventore amet officia. Dolorem sit expedita cum
                  sint quibusdam.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    // display: cartItem.product.description ? "-webkit-box" : "none",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    mt: 2,
                  }}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
                  accusamus minus placeat sequi enim, nihil adipisci? Est,
                  harum? Eligendi ipsam aperiam vel modi ducimus non assumenda
                  odit saepe vitae reiciendis! Natus non commodi earum
                  voluptatum iusto a perspiciatis totam explicabo rem
                  praesentium, tempore consequatur fugiat ab soluta quidem vero
                  id, dolores inventore amet officia. Dolorem sit expedita cum
                  sint quibusdam.
                </Typography>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default AboutPage;
