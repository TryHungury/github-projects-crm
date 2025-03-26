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

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      await API.post('/auth/register', values);
      message.success('Registration successful');
      navigate('/');
    } catch {
      message.error('Registration failed');
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
            Register
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
                Register
              </Button>
            </Form.Item>
          </Form>
          <p style={{ textAlign: 'center' }}>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </Card>
      </Spin>
    </div>
  );
}
