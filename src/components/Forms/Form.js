import React, { Component } from "react";
import { Form, Field } from "formik";
import CustomErrorMessage from "../Forms/CustomErrorMessage";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default class componentName extends Component {
  render() {
    return (
      <Form
        style={{
          width: "70vw",
          margin: "auto",
          border: "2px solid black",
          borderRadius: "8px",
          padding: 15,
        }}
      >
        <h3>{this.props.formTxt}</h3>
        <div className="row mt-4">
          <div className="col">
            <div className="form-group">
              <label htmlFor="exampleFormControlInput1">Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="form-control"
                id="exampleFormControlInput1"
              />
              <CustomErrorMessage name="firstname" />
            </div>
          </div>
        </div>
        <h3>{}</h3>
        <div className="row">
          <div className="col">
            <div className="form-group">
              {/* CKEditor */}
              <CKEditor
                name="body"
                editor={ClassicEditor}
                data={this.props.values.body}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.props.setFieldValue("body", data);
                }}
              />
              <CustomErrorMessage name="body" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div style={{ display: "flex" }}>
              <input
                type="submit"
                value={this.props.buttonTxt}
                className="btn btn-primary float-right"
              />
            </div>
          </div>
        </div>
      </Form>
    );
  }
}
