import React, { useState } from 'react';
import { Box, Card, CardContent, MenuItem, Select, Typography } from '@mui/material';
import CreateMathQuestion from "../createMathQuestionComponent/CreateMathQuestion.component";
import CreateFlagMatchingQuestion from "../createFlagMatchingQuestionComponent/flagMatchingQuestion.component";


const ComponentSelector: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string>('flagGuessing');

    const renderComponent = () => {
        switch (selectedComponent) {
            case 'mathQuestion':
                return <CreateMathQuestion/>;
            case 'flagMatching':
                return <CreateFlagMatchingQuestion />;    
            default:
                return <div>Select a component</div>;
        }
    };

    return (
        <Box sx={{ width: '100%', mx: 'auto', p: 2 }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Component Selector
                    </Typography>
                    <Select
                        value={selectedComponent}
                        onChange={(e) => setSelectedComponent(e.target.value as string)}
                        fullWidth
                    >
                        <MenuItem value="mathQuestion">Create Math Question</MenuItem>
                        <MenuItem value="flagMatching">Create Flag Matching Question</MenuItem>
                    </Select>
                    <Box sx={{ mt: 2 }}>
                        {renderComponent()}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ComponentSelector;