import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Grid,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material';
import { reports } from '../../services/api';
import { toast } from 'react-toastify';

const RelationshipReport = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await reports.getAll();
        setReportData(response.data);
      } catch (error) {
        toast.error('Failed to load reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Relationship Reports
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Here are the generated reports based on your relationships.
        </Typography>

        <Grid container spacing={3}>
          {reportData.map((report) => (
            <Grid item xs={12} sm={6} md={4} key={report.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{report.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {report.summary}
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  onClick={() => alert(report.details)}
                  sx={{ m: 1 }}
                >
                  View Report
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default RelationshipReport;