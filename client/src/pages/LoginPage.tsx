import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import API from '../api';
import {
  Button,
  Card,
  Form,
  Input,
  Typography,
  Spin,
  message,
} from 'antd';

const { Title } = Typography;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', values);
      localStorage.setItem('token', res.data.token);
      message.success('Login successful');
      navigate('/dashboard');
    } catch {
      message.error('Wrong email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '1rem',
      }}
    >
      <Spin spinning={loading} size="large">
        <Card style={{ width: 400 }}>
          <Title level={3} style={{ textAlign: 'center' }}>
            Login
          </Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: 'center' }}>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Card>
      </Spin>
    </div>
  );
}
