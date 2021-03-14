import React from "react";
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import { useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function MWProjectInfo(props) {
  const theme = useTheme();
  const { saveHandler, saveDisabled, project } = props;
  const [name, setName] = React.useState((project && project.name) || "");
  const [description, setDescription] = React.useState(
    (project && project.description) || ""
  );
  const handleSaveCB = React.useCallback(() => {
    saveHandler && saveHandler({ name, description });
  }, [saveHandler, name, description]);
  React.useEffect(() => {
    if (project.name) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  return (
    <Box>
      <TextField
        name="name"
        label="Project Name"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        name="description"
        label="Project Description"
        fullWidth
        inputProps={{ maxLength: 250 }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        paddingY={theme.custom.spacing.appBody}
      >
        <Button
          color="primary"
          variant="contained"
          onClick={handleSaveCB}
          disabled={saveDisabled}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}

MWProjectInfo.propTypes = {
  project: PropTypes.object,
  saveHandler: PropTypes.func,
  saveDisabled: PropTypes.bool,
};

export default MWProjectInfo;
