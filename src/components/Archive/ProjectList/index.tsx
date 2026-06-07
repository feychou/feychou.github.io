import type { Project } from '../data';
import ExternalLink from '../ExternalLink';
import './index.css';

type ProjectListProps = {
  projects: Project[];
};

function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <article className="project-row" key={project.name}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
          <div className="project-links">
            {project.links.map((link) => (
              <ExternalLink key={link[0] + link[1]} href={link[1]}>
                [{link[0]}]
              </ExternalLink>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default ProjectList;
