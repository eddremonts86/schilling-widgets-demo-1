import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from 'schilling-widgets-system';

const SimpleDemo: React.FC = () => {
  return (
    <div style={{ padding: '20px', marginBottom: '20px' }}>
      <Card>
        <CardHeader>
          <CardTitle>Simple Components Demo</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
            <Button variant='default'>Default Button</Button>
            <Button variant='secondary'>Secondary Button</Button>
            <Button variant='outline'>Outline Button</Button>
            <Input
              placeholder='Enter some text...'
              style={{ minWidth: '200px' }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDemo;
