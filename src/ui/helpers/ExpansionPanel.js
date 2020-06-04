// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import ExpansionPanel from "@material-ui/core/ExpansionPanel";
// import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
// import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
// import classes from "./ExpansionPanel.module.css";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//   },
//   heading: {
//     fontSize: theme.typography.pxToRem(15),
//     fontWeight: theme.typography.fontWeightRegular,
//   },
// }));

// export const SimpleExpansionPanel = (props) => {
//   const classes = useStyles();
//   console.log(props);
//   return (
//     <div className={classes.root}>
//       <ExpansionPanel>
//         <ExpansionPanelSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography className={classes.heading}>
//             <h4 className={classes.title}>{props.blog_post.title}</h4>
//             <div style={{ marginBottom: 20 }}>
//               <p dangerouslySetInnerHTML={{ __html: props.blog_post.body }}></p>
//             </div>
//           </Typography>
//         </ExpansionPanelSummary>
//         <ExpansionPanelDetails>
//           <Typography>
//             <h4 className="title">{props.first_name} said ...</h4>
//             <div style={{ marginBottom: 20 }}>
//               <p dangerouslySetInnerHTML={{ __html: props.body }}></p>
//             </div>
//           </Typography>
//         </ExpansionPanelDetails>
//       </ExpansionPanel>
//     </div>
//   );
// };
