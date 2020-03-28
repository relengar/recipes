import React from 'react';
import Slider from '@material-ui/core/Slider';
import { makeStyles, Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles'

type IngredientSliderProps = {
    amount: number,
    amountFill: number,
    unit: string,
    update: (amount: number) => void,
}

const useStyles = makeStyles((theme?: Theme) =>
  createStyles({
    root: {
      width: 200,
    },
  }),
);

function IngredientSlider({ amount, amountFill, unit, update }: IngredientSliderProps) {
    const classes = useStyles();

    return (
        <Slider
            marks={[{value: 0, label: `0 ${unit}`}, {value: amount, label: `${amount} ${unit}`}]}
            valueLabelDisplay="auto"
            className={classes.root}
            min={0}
            max={amount}
            defaultValue={amountFill}
            onChangeCommitted={(e, v) => {
                update(v as number);
            }}
        />
    );
}

export default IngredientSlider;