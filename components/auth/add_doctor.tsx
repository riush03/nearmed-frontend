import React from 'react'
import Input from '../common/Input';

const add_doctor = () => {
  
    return (
        <div
          className="modal "
          style={{
            display: "block",
          }}
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Doctor</h5>
                <button className="btn-close" />
              </div>
              <div className="modal-body">
                <div>
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Title:</label>
                        <select
                          className="form-control"
                          onChange={}
                        >
                          <option value="Miss">Miss</option>
                          <option value="Mr.">Mr.</option>
                          <option value="Mrs.">Mrs.</option>
                        </select>
                      </div>
                    </div>
                    <Input
                      name={"Name"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Last Name"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Gender"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Degree"}
                      type={"text"}
                      handleChange={}
                    />
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Address :</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          defaultValue={""}
                          onChange={}
                        />
                      </div>
                    </div>{" "}
                    <Input
                      name={"Designation"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Last Work"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Mobile"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"EmailID"}
                      type={"email"}
                      handleChange={}
                    />
                    <Input
                      name={"Collage Name"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Collage ID"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Joining Year"}
                      type={"date"}
                      handleChange={}
                    />
                    <Input
                      name={"End Year"}
                      type={"date"}
                      handleChange={}
                    />
                    <Input
                      name={"Specialization"}
                      type={"text"}
                      handleChange={}
                    />
                    <Input
                      name={"Registration ID"}
                      type={"text"}
                      handleChange={ }
                    />
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Collage Address :</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea1"
                          rows={3}
                          defaultValue={""}
                          onChange={ }
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Wallet Address</label>
                        <input
                          size={16}
                          className="form-control"
                          type="text"
                          onChange={}
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Upload Profile</label>
                        <input
                          className="form-control"
                          id="file"
                          onChange={}
                          type="file"
                        />
                      </div>
                    </div>
                    <div className="col-xl-12">
                      <div className="form-group">
                        <label className="col-form-label">Biography:</label>
                        <textarea
                          className="form-control"
                          id="exampleFormControlTextarea2"
                          rows={3}
                          onChange={}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  onClick={}
                  className="btn btn-primary"
                >
                  Add Doctor
                </button>
              </div>
            </div>
          </div>
        </div>
      );
};

export default add_doctor