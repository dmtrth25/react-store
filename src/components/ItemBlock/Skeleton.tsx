import {FC} from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={450}
    viewBox="0 0 260 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="257" y="227" rx="0" ry="0" width="0" height="7" />
    <rect x="227" y="278" rx="0" ry="0" width="7" height="3" />
    <rect x="-1" y="257" rx="10" ry="10" width="260" height="25" />
    <rect x="10" y="302" rx="0" ry="0" width="4" height="5" />
    <rect x="0" y="298" rx="15" ry="15" width="260" height="80" />
    <rect x="2" y="395" rx="15" ry="15" width="89" height="32" />
    <rect x="103" y="388" rx="15" ry="15" width="150" height="45" />
    <circle cx="129" cy="120" r="120" />
  </ContentLoader>
);
