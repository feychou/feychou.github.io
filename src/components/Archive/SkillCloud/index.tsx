import { Fragment } from 'react';
import type { Skill } from '../data';
import './index.css';

type SkillCloudProps = {
  skills: Skill[];
};

function SkillCloud({ skills }: SkillCloudProps) {
  return (
    <div className="skill-cloud">
      {skills.map((skill) => {
        if (typeof skill === 'string') {
          return <span key={skill}>{skill}</span>;
        }

        return (
          <span key={skill.key}>
            {skill.parts.map((part) => (
              part.strike
                ? <s key={part.text}>{part.text}</s>
                : <Fragment key={part.text}>{part.text}</Fragment>
            ))}
          </span>
        );
      })}
    </div>
  );
}

export default SkillCloud;
