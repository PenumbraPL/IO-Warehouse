import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/ad-layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useAuth } from 'src/hooks/use-auth';


const now = new Date();

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
              margin={5}>
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
                      component="div">
                      Calendar
                    </Typography>

                    <Typography variant="body2"
                      color="text.secondary">

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
                  href="/admin/employees"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="\assets\cards\istockphoto-1309080507.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      component="div">
                      Emplyees
                    </Typography>
                    <Typography variant="body2"
                      color="text.secondary">

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
                  href="/admin/empl_app"
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image="\assets\cards\istockphoto-1217019016.jpg"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom
                      variant="h5"
                      component="div">
                      {"Employees's applications"}
                    </Typography>
                    <Typography variant="body2"
                      color="text.secondary">

                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>

          {/* <Grid
          container
          spacing={3}
        >
         
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="1.6k"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="$15k"
            />
          </Grid>
          <Grid
            xs={12}
            lg={8}
          >
            <OverviewSales
              chartSeries={[
                {
                  name: 'This year',
                  data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                },
                {
                  name: 'Last year',
                  data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                }
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
            <OverviewTraffic
              chartSeries={[63, 15, 22]}
              labels={['Desktop', 'Tablet', 'Phone']}
              sx={{ height: '100%' }}
            />
          </Grid>          
        </Grid> */}
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
