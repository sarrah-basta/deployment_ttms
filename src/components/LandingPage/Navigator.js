import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import DomainIcon from '@material-ui/icons/Domain';
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import ClassIcon from '@material-ui/icons/Class';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import TableChartIcon from '@material-ui/icons/TableChart';
import CreateIcon from '@material-ui/icons/Create';

const categories = [
  {
    id: 'Tables',
    children: [
      { id: 'Student', icon: <PeopleOutlineIcon /> },
      { id: 'Faculty', icon: <PeopleIcon /> },
      { id: 'Department', icon: <DomainIcon /> },
      { id: 'Faculty_Replacement', icon: <SwapHorizontalCircleIcon /> },
      { id: 'Lab', icon: <DnsRoundedIcon /> },
      { id: 'Course', icon: <ImportContactsIcon /> },
      // { id: 'Class', icon: <ClassIcon /> }

    ],
  },
  {
    id: 'Generate Time Table',
    children: [
      { id: 'Create', icon: <CreateIcon /> },
      { id: 'Time_table', icon: <TableChartIcon /> }
    ]
  },
  {
    id: "Statistics",
    children: [
      { id: 'Reports', icon: <AssessmentOutlinedIcon /> }
    ]
  }
];

const styles = (theme) => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  categoryHeaderPrimary: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(2),
  },
});

function Navigator(props) {

  console.log(props);
  const { classes, active, tempFunc, ...other } = props;
  console.log(active);
  console.log({ ...other })


  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem className={clsx(classes.firebase, classes.item, classes.itemCategory)}>
          VJTI Time Table App
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Overview
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id} >
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon }) => (
              <ListItem
                key={childId}
                button
                className={clsx(classes.item, active === childId && classes.itemActiveItem)}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                  onClick={tempFunc}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            ))}

            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);