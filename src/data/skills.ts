interface Skill {
  name: string;
  icon: string;
  color: string;
}

// Every entry here is something that appears on the resume. The icon grid is
// a visual index of the resume's Technical Skills section, not a wish list.
export const skills: Skill[] = [
  { name: 'C#', icon: 'SiSharp', color: '#512BD4' },
  { name: '.NET', icon: 'SiDotnet', color: '#512BD4' },
  { name: 'Blazor', icon: 'SiBlazor', color: '#5C2D91' },
  { name: 'Python', icon: 'SiPython', color: '#3776AB' },
  { name: 'PostgreSQL', icon: 'SiPostgresql', color: '#4169E1' },
  { name: 'Docker', icon: 'SiDocker', color: '#2496ED' },
  { name: 'GitHub Actions', icon: 'SiGithubactions', color: '#2088FF' },
  { name: 'Git', icon: 'SiGit', color: '#F05032' },
  { name: 'JavaScript', icon: 'SiJavascript', color: '#D4B400' },
  { name: 'React', icon: 'SiReact', color: '#149ECA' },
  { name: 'Node.js', icon: 'SiNodedotjs', color: '#339933' },
  { name: 'FastAPI', icon: 'SiFastapi', color: '#009688' },
  { name: 'Flask', icon: 'SiFlask', color: '#5B6B7F' },
  { name: 'Django', icon: 'SiDjango', color: '#092E20' },
  { name: 'Pandas', icon: 'SiPandas', color: '#150458' },
  { name: 'Pytest', icon: 'SiPytest', color: '#0A9EDC' },
  { name: 'Claude API', icon: 'SiAnthropic', color: '#D97757' },
  { name: 'Twilio', icon: 'SiTwilio', color: '#F22F46' },
];
