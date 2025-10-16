export interface ArtifactData {
  type: "chart" | "diagram" | "anatomy" | "map";
  props: any;
}

const CHART_KEYWORDS = ["กราฟ", "แผนภูมิ", "chart", "graph", "ขอกราฟ"];
const DIAGRAM_KEYWORDS = ["แผนผัง", "โครงสร้าง", "diagram", "ขอแผนผัง"];
const ANATOMY_KEYWORDS = [
  "ร่างกาย",
  "อวัยวะ",
  "anatomy",
  "ขอโครงสร้างร่างกาย",
  "โครงสร้างร่างกาย",
];
const MAP_KEYWORDS = ["แผนที่", "map", "ขอแผนที่", "ที่ตั้ง"];

export function detectArtifactKeywords(text: string): string | null {
  const lowerText = text.toLowerCase();

  if (CHART_KEYWORDS.some((kw) => lowerText.includes(kw.toLowerCase()))) {
    return "chart";
  }
  if (DIAGRAM_KEYWORDS.some((kw) => lowerText.includes(kw.toLowerCase()))) {
    return "diagram";
  }
  if (ANATOMY_KEYWORDS.some((kw) => lowerText.includes(kw.toLowerCase()))) {
    return "anatomy";
  }
  if (MAP_KEYWORDS.some((kw) => lowerText.includes(kw.toLowerCase()))) {
    return "map";
  }

  return null;
}

export function generateArtifact(
  type: string,
  context?: string
): ArtifactData | null {
  switch (type) {
    case "chart":
      return generateChartArtifact(context);
    case "diagram":
      return generateDiagramArtifact(context);
    case "anatomy":
      return generateAnatomyArtifact(context);
    case "map":
      return generateMapArtifact(context);
    default:
      return null;
  }
}

function generateChartArtifact(context?: string): ArtifactData {
  // Check context for chart type
  const contextLower = context?.toLowerCase() || "";

  if (contextLower.includes("วงกลม") || contextLower.includes("pie")) {
    return {
      type: "chart",
      props: {
        title: "สัดส่วนการใช้เวลาในการเรียน",
        type: "pie",
        description: "แผนภูมิวงกลมแสดงการจัดสรรเวลา",
        data: [
          { name: "คณิตศาสตร์", value: 30 },
          { name: "ภาษาอังกฤษ", value: 25 },
          { name: "วิทยาศาสตร์", value: 20 },
          { name: "สังคม", value: 15 },
          { name: "อื่นๆ", value: 10 },
        ],
      },
    };
  }

  if (contextLower.includes("bar") || contextLower.includes("แท่ง")) {
    return {
      type: "chart",
      props: {
        title: "คะแนนสอบรายวิชา",
        type: "bar",
        description: "แผนภูมิแท่งแสดงผลการเรียน",
        data: [
          { name: "คณิตศาสตร์", value: 85 },
          { name: "ภาษาอังกฤษ", value: 92 },
          { name: "วิทยาศาสตร์", value: 88 },
          { name: "สังคม", value: 90 },
          { name: "ภาษาไทย", value: 87 },
        ],
      },
    };
  }

  // Default to line chart
  return {
    type: "chart",
    props: {
      title: "ความก้าวหน้าในการเรียน",
      type: "line",
      description: "กราฟเส้นแสดงพัฒนาการการเรียนรู้",
      data: [
        { name: "สัปดาห์ 1", value: 65 },
        { name: "สัปดาห์ 2", value: 70 },
        { name: "สัปดาห์ 3", value: 75 },
        { name: "สัปดาห์ 4", value: 82 },
        { name: "สัปดาห์ 5", value: 88 },
        { name: "สัปดาห์ 6", value: 92 },
      ],
    },
  };
}

function generateDiagramArtifact(context?: string): ArtifactData {
  return {
    type: "diagram",
    props: {
      title: "กระบวนการเรียนรู้",
      description: "แผนผังแสดงขั้นตอนการเรียนรู้",
      nodes: [
        { id: "1", label: "เริ่มต้น", x: 100, y: 200, color: "#4CAF50" },
        { id: "2", label: "ศึกษา", x: 250, y: 150, color: "#2196F3" },
        { id: "3", label: "ฝึกฝน", x: 250, y: 250, color: "#2196F3" },
        { id: "4", label: "ทดสอบ", x: 400, y: 200, color: "#FF6B1A" },
        { id: "5", label: "ประเมินผล", x: 550, y: 200, color: "#F5A623" },
        { id: "6", label: "ปรับปรุง", x: 700, y: 200, color: "#9C27B0" },
      ],
      edges: [
        { from: "1", to: "2", label: "เริ่ม" },
        { from: "1", to: "3", label: "เริ่ม" },
        { from: "2", to: "4", label: "พร้อม" },
        { from: "3", to: "4", label: "พร้อม" },
        { from: "4", to: "5", label: "ส่งผล" },
        { from: "5", to: "6", label: "วิเคราะห์" },
      ],
    },
  };
}

function generateAnatomyArtifact(context?: string): ArtifactData {
  return {
    type: "anatomy",
    props: {
      title: "โครงสร้างร่างกายมนุษย์",
      type: "human",
      description:
        "แผนภาพแสดงอวัยวะสำคัญของร่างกายมนุษย์ คลิกที่แต่ละส่วนเพื่อดูรายละเอียด",
    },
  };
}

function generateMapArtifact(context?: string): ArtifactData {
  const contextLower = context?.toLowerCase() || "";

  // Thailand regions map
  return {
    type: "map",
    props: {
      title: "แผนที่ภูมิภาคของประเทศไทย",
      type: "thailand",
      description: "แผนที่แสดงภูมิภาคต่างๆ ของประเทศไทย",
      locations: [
        {
          id: "central",
          name: "ภาคกลาง",
          x: 250,
          y: 200,
          description: "เป็นศูนย์กลางเศรษฐกิจและการปกครอง",
          color: "#FF6B1A",
        },
        {
          id: "north",
          name: "ภาคเหนือ",
          x: 240,
          y: 100,
          description: "มีวัฒนธรรมล้านนาที่โดดเด่น",
          color: "#4CAF50",
        },
        {
          id: "northeast",
          name: "ภาคอีสาน",
          x: 300,
          y: 150,
          description: "มีพื้นที่กว้างใหญ่ที่สุด",
          color: "#2196F3",
        },
        {
          id: "south",
          name: "ภาคใต้",
          x: 250,
          y: 350,
          description: "เป็นแหล่งท่องเที่ยวสำคัญ",
          color: "#F5A623",
        },
        {
          id: "east",
          name: "ภาคตะวันออก",
          x: 300,
          y: 240,
          description: "เป็นศูนย์กลางอุตสาหกรรม",
          color: "#9C27B0",
        },
      ],
    },
  };
}
