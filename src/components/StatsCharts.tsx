import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const attendanceData = {
  labels: ['Day 1', 'Day 2', 'Day 3'],
  datasets: [
    {
      label: 'Expected Attendance',
      data: [8500, 10000, 12000],
      borderColor: '#ffd25a',
      backgroundColor: 'rgba(255, 210, 90, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: '#ffd25a',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
    {
      label: 'Registered',
      data: [7200, 8800, 9500],
      borderColor: '#65caff',
      backgroundColor: 'rgba(101, 202, 255, 0.1)',
      fill: true,
      tension: 0.4,
      borderWidth: 3,
      pointRadius: 6,
      pointBackgroundColor: '#65caff',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
    },
  ],
};

const eventParticipationData = {
  labels: ['Music', 'Dance', 'Art', 'Tech', 'Literary'],
  datasets: [
    {
      label: 'Participants',
      data: [450, 320, 280, 180, 150],
      backgroundColor: [
        'rgba(198, 43, 43, 0.8)',
        'rgba(101, 202, 255, 0.8)',
        'rgba(255, 210, 90, 0.8)',
        'rgba(247, 135, 36, 0.8)',
        'rgba(143, 92, 46, 0.8)',
      ],
      borderColor: [
        '#c62b2b',
        '#65caff',
        '#ffd25a',
        '#f78724',
        '#8f5c2e',
      ],
      borderWidth: 2,
    },
  ],
};

const categoryDistributionData = {
  labels: ['Music Events', 'Cultural Events', 'Tech Events', 'Workshops'],
  datasets: [
    {
      data: [35, 30, 20, 15],
      backgroundColor: [
        'rgba(198, 43, 43, 0.8)',
        'rgba(255, 210, 90, 0.8)',
        'rgba(101, 202, 255, 0.8)',
        'rgba(247, 135, 36, 0.8)',
      ],
      borderColor: [
        '#c62b2b',
        '#ffd25a',
        '#65caff',
        '#f78724',
      ],
      borderWidth: 3,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
        font: {
          family: 'Poppins',
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffd25a',
      bodyColor: '#ffffff',
      borderColor: '#ffd25a',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#ffffff',
        font: {
          family: 'Poppins',
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
    y: {
      ticks: {
        color: '#ffffff',
        font: {
          family: 'Poppins',
        },
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
    },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: '#ffffff',
        font: {
          family: 'Poppins',
          size: 12,
        },
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#ffd25a',
      bodyColor: '#ffffff',
      borderColor: '#ffd25a',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
    },
  },
};

export function StatsCharts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });


  return (
    <section ref={sectionRef} className="py-16 md:py-24 relative bg-gradient-dark overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="font-bebas text-4xl sm:text-5xl md:text-7xl mb-4">
            Event <span className="text-gradient-cyan">Statistics</span>
          </h2>
          <p className="font-poppins text-foreground/70 max-w-2xl mx-auto text-sm md:text-base">
            Track the pulse of IMPACT 2026 with real-time statistics and insights.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Attendance Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="chart-container bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-accent/50 transition-all duration-300"
          >
            <h3 className="font-bebas text-2xl mb-4 text-accent">Daily Attendance</h3>
            <div className="h-64">
              <Line data={attendanceData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Event Participation Bar Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="chart-container bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-accent/50 transition-all duration-300"
          >
            <h3 className="font-bebas text-2xl mb-4 text-secondary">Event Participation</h3>
            <div className="h-64">
              <Bar data={eventParticipationData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Category Distribution Doughnut Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="chart-container lg:col-span-2 bg-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/30 hover:border-accent/50 transition-all duration-300"
          >
            <h3 className="font-bebas text-2xl mb-4 text-orange text-center">Event Distribution</h3>
            <div className="h-80 max-w-2xl mx-auto">
              <Doughnut data={categoryDistributionData} options={doughnutOptions} />
            </div>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-12"
        >
          {[
            { label: 'Total Events', value: '50+', color: 'text-primary' },
            { label: 'Participants', value: '2,500+', color: 'text-secondary' },
            { label: 'Prize Pool', value: '₹10L+', color: 'text-accent' },
            { label: 'Days', value: '3', color: 'text-orange' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-card/30 backdrop-blur-sm rounded-xl p-6 border border-border/30 hover:border-accent/50 transition-all duration-300 text-center"
            >
              <div className={`font-bebas text-3xl md:text-4xl mb-2 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="font-poppins text-xs md:text-sm text-foreground/70">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

