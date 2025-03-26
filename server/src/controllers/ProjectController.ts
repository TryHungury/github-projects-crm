import { Request, Response } from 'express';
import { Project } from '../models/Project';

export class ProjectController {
  static async getProjects(req: Request, res: Response): Promise<void> {
    const projects = await Project.findAll();
    res.json(projects);
  }

  static async addProject(req: Request, res: Response): Promise<void> {
    const { path } = req.body;

    const [owner, repo] = path.split('/');
    if (!owner || !repo) {
      res.status(400).json({ error: 'Invalid repository path' });
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      const data = await response.json();

      const project = await Project.create({
        owner: data.owner.login,
        name: data.name,
        url: data.html_url,
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        createdAt: data.created_at,
      });

      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch GitHub repo' });
    }
  }

  static async deleteProject(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await Project.destroy({ where: { id } });
      res.status(204).end();
    } catch {
      res.status(500).json({ error: 'Failed to delete project' });
    }
  }
}
