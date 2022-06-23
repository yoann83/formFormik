import { useEffect, useState, useContext } from "react";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import "../styles.scss";
import DispachContext from "../contexts/DispachContext";

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export default function TransfertList({ list }) {
  const [checked, setChecked] = useState<readonly number[]>([]);
  const [left, setLeft] = useState<readonly number[]>([]);
  const [right, setRight] = useState<readonly number[]>([]);

  const leftChecked = intersection(checked, left);
  const { name, setChoice } = useContext(DispachContext);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    const choices = [...right.concat(left)];
    setChoice(choices);
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    const choices = [...leftChecked.concat(right)];
    setChoice(choices);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    const choices = [];
    setChoice(choices);
    setRight([]);
  };

  const customList = (items: readonly number[]) => (
    <Paper sx={{ width: 200, height: 230, overflow: "auto" }}>
      <List dense component="div" role="list">
        {items.map((value: number, key) => {
          const labelId = `${value}`;

          return (
            <ListItem
              key={key}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  required={right.length <= 0 ? true : false}
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={labelId} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  useEffect(() => {
    setLeft(list);
  }, [list]);

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {right.length <= 0 ? (
          <Alert severity="info">Please, select your choice!</Alert>
        ) : (
          [...new Set(name)].map((value: number, key) => {
            const choiceSelected = `${value}`;
            return <ListItemText key={key}>{choiceSelected}</ListItemText>;
          })
        )}
      </Grid>
    </Grid>
  );
}
