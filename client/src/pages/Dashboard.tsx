import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { Project } from '../types/Project';
import {
  Button,
  Card,
  Input,
  List,
  Space,
  Typography,
  message,
  Layout,
  Spin,
} from 'antd';

const { Title, Text, Link } = Typography;
const { Header, Content } = Layout;

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newRepo, setNewRepo] = useState('');
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [addingRepo, setAddingRepo] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await API.get('/projects');
      setProjects(res.data);
    } catch {
      message.error('Not authorized');
      navigate('/');
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    if (!newRepo.trim()) return;
    setAddingRepo(true);
    try {
      await API.post('/projects', { path: newRepo.trim() });
      setNewRepo('');
      await fetchProjects();
      message.success('Repository added!');
    } catch {
      message.error('Failed to add repository');
    } finally {
      setAddingRepo(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await API.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p.id !== id));
      message.success('Project deleted');
    } catch {
      message.error('Failed to delete');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={3} style={{ color: '#fff', margin: 0 }}>GitHub Projects</Title>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: '2rem' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              value={newRepo}
              onChange={e => setNewRepo(e.target.value)}
              placeholder="e.g. facebook/react"
              disabled={addingRepo}
            />
            <Button type="primary" onClick={handleAdd} loading={addingRepo}>
              Add
            </Button>
          </Space.Compact>

          {loadingProjects ? (
            <Spin size="large" style={{ display: 'block', margin: '2rem auto' }} />
          ) : (
            <List
              grid={{ gutter: 16, column: 1 }}
              dataSource={projects}
              renderItem={p => (
                <List.Item>
                  <Card
                    title={`${p.owner}/${p.name}`}
                    extra={
                      <Button type="primary" danger onClick={() => handleDelete(p.id)}>
                        Delete
                      </Button>
                    }
                  >
                    <Text>⭐ Stars: {p.stars}</Text><br />
                    <Text>🍴 Forks: {p.forks}</Text><br />
                    <Text>🐞 Issues: {p.issues}</Text><br />
                    <Text>🕒 Created: {p.createdAt}</Text><br />
                    <Text>🔗 <Link href={p.url} target="_blank">{p.url}</Link></Text>
                  </Card>
                </List.Item>
              )}
            />
          )}
        </Space>
      </Content>
    </Layout>
  );
}
