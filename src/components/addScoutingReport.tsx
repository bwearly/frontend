import {
  Modal,
  Box,
  Typography,
  Autocomplete,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { useState, useMemo } from 'react';
import type { PlayerBio } from '../types/PlayerBio';
import playerData from '../api/PlayerData.json';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#1d1f2b',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  color: 'white',
};

export default function AddScoutingReport({
  open,
  onClose,
  addReport,
}: {
  open: boolean;
  onClose: () => void;
  addReport: (playerId: number, scout: string, report: string) => void;
}) {
  const navigate = useNavigate();

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerBio | null>(null);
  const [scout, setScout] = useState('');
  const [reportText, setReportText] = useState('');

  const handleSubmit = () => {
    if (!selectedPlayer || !scout || !reportText) return;
    addReport(selectedPlayer.playerId, scout, reportText);
    onClose();
    navigate(`/scoutReports#player-${selectedPlayer.playerId}`);
  };

  const scoutOptions = useMemo(() => {
    const scouts = playerData.scoutingReports
      .map((r) => r.scout)
      .filter(Boolean);
    return Array.from(new Set(scouts));
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2} color="white">
          Add Scouting Report
        </Typography>

        <Autocomplete<PlayerBio>
          options={playerData.bio}
          getOptionLabel={(option) => option.name}
          onChange={(_, value) => setSelectedPlayer(value)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Player"
              fullWidth
              variant="outlined"
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                ...params.InputProps,
                style: { color: 'white' },
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#2a2d3a',
                },
              }}
            />
          )}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel sx={{ color: 'white' }}>Scout</InputLabel>
          <Select
            value={scout}
            label="Scout"
            onChange={(e) => setScout(e.target.value)}
            sx={{
              color: 'white',
              backgroundColor: '#2a2d3a',
              '& .MuiSelect-icon': { color: 'white' },
            }}
          >
            {scoutOptions.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Scouting Report"
          multiline
          rows={6}
          fullWidth
          margin="normal"
          value={reportText}
          onChange={(e) => setReportText(e.target.value)}
          InputLabelProps={{ style: { color: 'white' } }}
          InputProps={{
            style: { color: 'white', backgroundColor: '#2a2d3a' },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{
            mt: 2,
            backgroundColor: '#3cb371',
            '&:hover': {
              backgroundColor: '#2e9e5e',
            },
          }}
        >
          Save Report
        </Button>
      </Box>
    </Modal>
  );
}
