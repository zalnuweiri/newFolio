import { CompactAudioPlayer } from './CompactAudioPlayer';

interface ActivityTimelineProps {
  theme: 'dark' | 'light';
}

export function ActivityTimeline({ theme }: ActivityTimelineProps) {
  return (
    <div className={`rounded-3xl p-6 md:p-8 border bg-[#111111] border-gray-800/50 relative overflow-hidden group cursor-pointer`}>
      {/* Section Label */}
      <div className="absolute top-6 left-6 text-xs text-gray-600 z-10">
        05 AUDIO VISUALIZER
      </div>
      
      <CompactAudioPlayer />
    </div>
  );
}