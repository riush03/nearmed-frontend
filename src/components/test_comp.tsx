"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@dapp/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@dapp/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { name: 'Jan', patients: 400 },
  { name: 'Feb', patients: 300 },
  { name: 'Mar', patients: 500 },
  { name: 'Apr', patients: 280 },
  { name: 'May', patients: 590 },
  { name: 'Jun', patients: 320 },
];

const weeklyData = [
  { name: 'Mon', patients: 50 },
  { name: 'Tue', patients: 80 },
  { name: 'Wed', patients: 45 },
  { name: 'Thu', patients: 60 },
  { name: 'Fri', patients: 75 },
  { name: 'Sat', patients: 30 },
  { name: 'Sun', patients: 20 },
];

const todayData = [
  { name: '9AM', patients: 5 },
  { name: '12PM', patients: 12 },
  { name: '3PM', patients: 8 },
  { name: '6PM', patients: 15 },
  { name: '9PM', patients: 3 },
];

const PatientStatistics = () => {
  const [activeTab, setActiveTab] = useState('monthly');

  const renderChart = (data: any[]) => (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="patients" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Patient Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
          </TabsList>
          <TabsContent value="monthly">
            {renderChart(monthlyData)}
          </TabsContent>
          <TabsContent value="weekly">
            {renderChart(weeklyData)}
          </TabsContent>
          <TabsContent value="today">
            {renderChart(todayData)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PatientStatistics;