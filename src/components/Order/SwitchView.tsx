import * as React from 'react';
import Switch, { switchClasses } from '@mui/joy/Switch';
import { Box, Theme, Typography } from '@mui/joy';

interface SwitchViewProps {
  checked: boolean;
  onSwitchChange: (isChecked: boolean) => void;
}

export default function SwitchView({ checked, onSwitchChange }: SwitchViewProps) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2, height: '25px', width: '100px' }}>
      <Switch
        checked={checked}
        onChange={(event: any) => onSwitchChange(event.target.checked)}
      />
      {checked ? <Typography>Listview</Typography> : <Typography>Cardview</Typography>}
    </Box>
  );
}
