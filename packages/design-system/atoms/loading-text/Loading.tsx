const loadingTexts = [
  'Loading Roleypoly...',
  'Reticulating splines...',
  'Mining cryptocoins...',
  'Going to Mars...',
  'Building the Box Signature Edition...',
  'Hiring a new CEO...',
  'Firing the new CEO...',
  'Doing a calculation...',
  'Doin a fixy boi...',
  'Feeling like a plastic bag...',
  'Levelling up...',
  'Your Roleypoly is evolving!!!',
  'Adding subtitles...',
  'Rolling... Rolling...',
];

export const LoadingFill = (props: { forceIndex?: keyof typeof loadingTexts }) => {
  const useEasterEgg = Math.floor(Math.random() * 10) === 0;
  const index =
    props.forceIndex !== undefined
      ? props.forceIndex
      : useEasterEgg
      ? Math.floor(Math.random() * loadingTexts.length)
      : 0;

  const text = loadingTexts[index];

  return <>{text}</>;
};
