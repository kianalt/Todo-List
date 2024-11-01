import React, { useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Paper } from "@mui/material";
import { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
}

const colorMapping: Record<Task["status"], string> = {
  TODO: "#8884d8",
  DOING: "#29b6f6",
  DONE: "#66bb6a",
  WARNING: "#ff8042",
  FAILED: "#f44336",
  PENDING: "#d88484",
};

const TaskStatus: React.FC<TaskListProps> = ({ tasks }) => {
  const data = useMemo(() => {
    const statusMap = tasks.reduce((acc, task) => {
      if (acc[task.status]) {
        acc[task.status].y += task.estimate;
      } else {
        acc[task.status] = {
          name: task.status,
          y: task.estimate,
          color: colorMapping[task.status],
        };
      }
      return acc;
    }, {} as Record<string, { name: string; y: number; color: string }>);

    return Object.values(statusMap);
  }, [tasks]);

  const options: Highcharts.Options = useMemo(
    () => ({
      chart: {
        type: "pie",
        backgroundColor: "#151515",
        width: 600,
        height: 300,
        border: "none",
      },
      title: {
        text: "",
        style: { color: "#ffffff" },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          innerSize: "40%",
          startAngle: -90,
          endAngle: 90,
          dataLabels: {
            enabled: true,
            format: "{point.name}",
            style: { color: "#ffffff" },
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "Task Status",
          data,
        },
      ],
    }),
    [data]
  );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <Paper
        sx={{
          marginTop: 3,
          borderRadius: 2,
          backgroundColor: "#151515",
          padding: 0,
          border: "none",
        }}
        elevation={3}
      >
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Paper>
    </Box>
  );
};

export default TaskStatus;
