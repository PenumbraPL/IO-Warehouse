import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useAuth } from 'src/hooks/use-auth';


const Page = () => {
  const auth = useAuth();
  const user = auth.user;

  return (
    <>
      <Head>
        <title>
          Overview | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <Typography variant="h2"
              component="h2"
              margin={5}
            >
              Welcome, {user ? user.name : ""}
            </Typography>
          </Grid>

          <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <Card >
                <CardActionArea
                  href="/calendar"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="\assets\cards\istockphoto-1307098713.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Calendar
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <Card >
                <CardActionArea
                  href="/warehouse"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="\assets\cards\istockphoto-1138429558.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Warehouse
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={4}
            >
              <Card >
                <CardActionArea
                  href="/form"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="\assets\cards\istockphoto-1021543918.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Form
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
