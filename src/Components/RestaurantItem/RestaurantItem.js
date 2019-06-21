import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantDetails from '../RestaurantDetails'


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class RestaurantItem extends React.Component {
  state = {
    expanded: null,
    data: this.props.data
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;
    console.log(this.props)

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{this.props.name}</Typography>
            <Typography className={classes.secondaryHeading}>{this.props.averageRating}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>

            <Typography>
              <RestaurantDetails data={this.state.data} />
            </Typography>

          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

RestaurantItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RestaurantItem);