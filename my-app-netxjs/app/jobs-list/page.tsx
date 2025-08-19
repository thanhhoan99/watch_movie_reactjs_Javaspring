﻿/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import BlogSlider from "@/components/sliders/Blog";
import { useEffect, useState } from "react";
import { jobPostingService } from "@/services/jobPostingService";
import { applyService } from "@/services/applyService";
import { resumeService } from "@/services/resumeService";

export default function JobList() {
 
   const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalJob, setModalJob] = useState<any | null>(null);

    const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [resumeLink, setResumeLink] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

   const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ACCEPTED_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobPostingService.getAllJob();
        if (Array.isArray(res)) setJobs(res);
        else setJobs(res.data || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await resumeService.getAllResumes();
        if (Array.isArray(res)) setResumes(res);
        else setResumes(res.data || []);

        console.log("Fetched resumes:", res);
      } catch (err) {
        console.error("Error fetching resumes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      alert("File không hợp lệ. Chỉ chấp nhận PDF, DOC, DOCX");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      alert("File quá lớn. Kích thước tối đa 5MB");
      return;
    }
    setFile(selectedFile);
  };

  const handleApply = async (jobId: number) => {
     if (!selectedResumeId && !resumeLink && !file) {
      alert("Vui lòng chọn Resume có sẵn hoặc nhập link hoặc upload file!");
      return;
    }

    try {
      setSubmitting(true);
      setProgress(0);

      const formData = new FormData();
      if (selectedResumeId) formData.append("resumesId", selectedResumeId);
      if (resumeLink) formData.append("resumeLink", resumeLink);
      if (file) formData.append("resumeFile", file);
      if (message) formData.append("coverLetter", message);

      await applyService.applyJobWithFile(jobId, formData, {
        onUploadProgress: (event: ProgressEvent) => {
          if (event.total) {
            setProgress(Math.round((event.loaded * 100) / event.total));
          }
        },
      });

      alert("✅ Applied successfully!");
      setResumeLink("");
      setMessage("");
      setFile(null);
      setSelectedResumeId("");
      setModalJob(null);
      setProgress(0);
    } catch (err: any) {
      console.error("Apply job failed:", err);
      alert(err.response?.data?.message || "Failed to apply job!");
      setProgress(0);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Layout>
        <div>
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-single banner-single-bg">
                <div className="block-banner text-center">
                  <h3 className="wow animate__animated animate__fadeInUp">
                    <span className="color-brand-2">22 Jobs</span> Available Now
                  </h3>
                  <div className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp" data-wow-delay=".1s">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repellendus magni, <br className="d-none d-xl-block" />
                    atque delectus molestias quis?
                  </div>
                  <div className="form-find text-start mt-40 wow animate__animated animate__fadeInUp" data-wow-delay=".2s">
                    <form>
                      <div className="box-industry">
                        <select className="form-input mr-10 select-active input-industry">
                          <option value={0}>Industry</option>
                          <option value={1}>Software</option>
                          <option value={2}>Finance</option>
                          <option value={3}>Recruting</option>
                          <option value={4}>Management</option>
                          <option value={5}>Advertising</option>
                          <option value={6}>Development</option>
                        </select>
                      </div>
                      <div className="box-industry">
                        <select className="form-input mr-10 select-active input-location">
                          <option value="">Location</option>
                          <option value="AX">Aland Islands</option>
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="AR">Argentina</option>
                          <option value="AM">Armenia</option>
                          <option value="AW">Aruba</option>
                          <option value="AU">Australia</option>
                          <option value="AT">Austria</option>
                          <option value="AZ">Azerbaijan</option>
                          <option value="BS">Bahamas</option>
                          <option value="BH">Bahrain</option>
                          <option value="BD">Bangladesh</option>
                          <option value="BB">Barbados</option>
                          <option value="BY">Belarus</option>
                          <option value="PW">Belau</option>
                          <option value="BE">Belgium</option>
                          <option value="BZ">Belize</option>
                          <option value="BJ">Benin</option>
                          <option value="BM">Bermuda</option>
                          <option value="BT">Bhutan</option>
                          <option value="BO">Bolivia</option>
                          <option value="BQ">Bonaire, Saint Eustatius and Saba</option>
                          <option value="BA">Bosnia and Herzegovina</option>
                          <option value="BW">Botswana</option>
                          <option value="BV">Bouvet Island</option>
                          <option value="BR">Brazil</option>
                          <option value="IO">British Indian Ocean Territory</option>
                          <option value="VG">British Virgin Islands</option>
                          <option value="BN">Brunei</option>
                          <option value="BG">Bulgaria</option>
                          <option value="BF">Burkina Faso</option>
                          <option value="BI">Burundi</option>
                          <option value="KH">Cambodia</option>
                          <option value="CM">Cameroon</option>
                          <option value="CA">Canada</option>
                          <option value="CV">Cape Verde</option>
                          <option value="KY">Cayman Islands</option>
                          <option value="CF">Central African Republic</option>
                          <option value="TD">Chad</option>
                          <option value="CL">Chile</option>
                          <option value="CN">China</option>
                          <option value="CX">Christmas Island</option>
                          <option value="CC">Cocos (Keeling) Islands</option>
                          <option value="CO">Colombia</option>
                          <option value="KM">Comoros</option>
                          <option value="CG">Congo (Brazzaville)</option>
                          <option value="CD">Congo (Kinshasa)</option>
                          <option value="CK">Cook Islands</option>
                          <option value="CR">Costa Rica</option>
                          <option value="HR">Croatia</option>
                          <option value="CU">Cuba</option>
                          <option value="CW">CuraÇao</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="DJ">Djibouti</option>
                          <option value="DM">Dominica</option>
                          <option value="DO">Dominican Republic</option>
                          <option value="EC">Ecuador</option>
                          <option value="EG">Egypt</option>
                          <option value="SV">El Salvador</option>
                          <option value="GQ">Equatorial Guinea</option>
                          <option value="ER">Eritrea</option>
                          <option value="EE">Estonia</option>
                          <option value="ET">Ethiopia</option>
                          <option value="FK">Falkland Islands</option>
                          <option value="FO">Faroe Islands</option>
                          <option value="FJ">Fiji</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="GF">French Guiana</option>
                          <option value="PF">French Polynesia</option>
                          <option value="TF">French Southern Territories</option>
                          <option value="GA">Gabon</option>
                          <option value="GM">Gambia</option>
                          <option value="GE">Georgia</option>
                          <option value="DE">Germany</option>
                          <option value="GH">Ghana</option>
                          <option value="GI">Gibraltar</option>
                          <option value="GR">Greece</option>
                          <option value="GL">Greenland</option>
                          <option value="GD">Grenada</option>
                          <option value="GP">Guadeloupe</option>
                          <option value="GT">Guatemala</option>
                          <option value="GG">Guernsey</option>
                          <option value="GN">Guinea</option>
                          <option value="GW">Guinea-Bissau</option>
                          <option value="GY">Guyana</option>
                          <option value="HT">Haiti</option>
                          <option value="HM">Heard Island and McDonald Islands</option>
                          <option value="HN">Honduras</option>
                          <option value="HK">Hong Kong</option>
                          <option value="HU">Hungary</option>
                          <option value="IS">Iceland</option>
                          <option value="IN">India</option>
                          <option value="ID">Indonesia</option>
                          <option value="IR">Iran</option>
                          <option value="IQ">Iraq</option>
                          <option value="IM">Isle of Man</option>
                          <option value="IL">Israel</option>
                          <option value="IT">Italy</option>
                          <option value="CI">Ivory Coast</option>
                          <option value="JM">Jamaica</option>
                          <option value="JP">Japan</option>
                          <option value="JE">Jersey</option>
                          <option value="JO">Jordan</option>
                          <option value="KZ">Kazakhstan</option>
                          <option value="KE">Kenya</option>
                          <option value="KI">Kiribati</option>
                          <option value="KW">Kuwait</option>
                          <option value="KG">Kyrgyzstan</option>
                          <option value="LA">Laos</option>
                          <option value="LV">Latvia</option>
                          <option value="LB">Lebanon</option>
                          <option value="LS">Lesotho</option>
                          <option value="LR">Liberia</option>
                          <option value="LY">Libya</option>
                          <option value="LI">Liechtenstein</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MO">Macao S.A.R., China</option>
                          <option value="MK">Macedonia</option>
                          <option value="MG">Madagascar</option>
                          <option value="MW">Malawi</option>
                          <option value="MY">Malaysia</option>
                          <option value="MV">Maldives</option>
                          <option value="ML">Mali</option>
                          <option value="MT">Malta</option>
                          <option value="MH">Marshall Islands</option>
                          <option value="MQ">Martinique</option>
                          <option value="MR">Mauritania</option>
                          <option value="MU">Mauritius</option>
                          <option value="YT">Mayotte</option>
                          <option value="MX">Mexico</option>
                          <option value="FM">Micronesia</option>
                          <option value="MD">Moldova</option>
                          <option value="MC">Monaco</option>
                          <option value="MN">Mongolia</option>
                          <option value="ME">Montenegro</option>
                          <option value="MS">Montserrat</option>
                          <option value="MA">Morocco</option>
                          <option value="MZ">Mozambique</option>
                          <option value="MM">Myanmar</option>
                          <option value="NA">Namibia</option>
                          <option value="NR">Nauru</option>
                          <option value="NP">Nepal</option>
                          <option value="NL">Netherlands</option>
                          <option value="AN">Netherlands Antilles</option>
                          <option value="NC">New Caledonia</option>
                          <option value="NZ">New Zealand</option>
                          <option value="NI">Nicaragua</option>
                          <option value="NE">Niger</option>
                          <option value="NG">Nigeria</option>
                          <option value="NU">Niue</option>
                          <option value="NF">Norfolk Island</option>
                          <option value="KP">North Korea</option>
                          <option value="NO">Norway</option>
                          <option value="OM">Oman</option>
                          <option value="PK">Pakistan</option>
                          <option value="PS">Palestinian Territory</option>
                          <option value="PA">Panama</option>
                          <option value="PG">Papua New Guinea</option>
                          <option value="PY">Paraguay</option>
                          <option value="PE">Peru</option>
                          <option value="PH">Philippines</option>
                          <option value="PN">Pitcairn</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="QA">Qatar</option>
                          <option value="IE">Republic of Ireland</option>
                          <option value="RE">Reunion</option>
                          <option value="RO">Romania</option>
                          <option value="RU">Russia</option>
                          <option value="RW">Rwanda</option>
                          <option value="ST">São Tomé and Príncipe</option>
                          <option value="BL">Saint Barthélemy</option>
                          <option value="SH">Saint Helena</option>
                          <option value="KN">Saint Kitts and Nevis</option>
                          <option value="LC">Saint Lucia</option>
                          <option value="SX">Saint Martin (Dutch part)</option>
                          <option value="MF">Saint Martin (French part)</option>
                          <option value="PM">Saint Pierre and Miquelon</option>
                          <option value="VC">Saint Vincent and the Grenadines</option>
                          <option value="SM">San Marino</option>
                          <option value="SA">Saudi Arabia</option>
                          <option value="SN">Senegal</option>
                          <option value="RS">Serbia</option>
                          <option value="SC">Seychelles</option>
                          <option value="SL">Sierra Leone</option>
                          <option value="SG">Singapore</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="SB">Solomon Islands</option>
                          <option value="SO">Somalia</option>
                          <option value="ZA">South Africa</option>
                          <option value="GS">South Georgia/Sandwich Islands</option>
                          <option value="KR">South Korea</option>
                          <option value="SS">South Sudan</option>
                          <option value="ES">Spain</option>
                          <option value="LK">Sri Lanka</option>
                          <option value="SD">Sudan</option>
                          <option value="SR">Suriname</option>
                          <option value="SJ">Svalbard and Jan Mayen</option>
                          <option value="SZ">Swaziland</option>
                          <option value="SE">Sweden</option>
                          <option value="CH">Switzerland</option>
                          <option value="SY">Syria</option>
                          <option value="TW">Taiwan</option>
                          <option value="TJ">Tajikistan</option>
                          <option value="TZ">Tanzania</option>
                          <option value="TH">Thailand</option>
                          <option value="TL">Timor-Leste</option>
                          <option value="TG">Togo</option>
                          <option value="TK">Tokelau</option>
                          <option value="TO">Tonga</option>
                          <option value="TT">Trinidad and Tobago</option>
                          <option value="TN">Tunisia</option>
                          <option value="TR">Turkey</option>
                          <option value="TM">Turkmenistan</option>
                          <option value="TC">Turks and Caicos Islands</option>
                          <option value="TV">Tuvalu</option>
                          <option value="UG">Uganda</option>
                          <option value="UA">Ukraine</option>
                          <option value="AE">United Arab Emirates</option>
                          <option value="GB">United Kingdom (UK)</option>
                          <option value="US">USA (US)</option>
                          <option value="UY">Uruguay</option>
                          <option value="UZ">Uzbekistan</option>
                          <option value="VU">Vanuatu</option>
                          <option value="VA">Vatican</option>
                          <option value="VE">Venezuela</option>
                          <option value="VN">Vietnam</option>
                          <option value="WF">Wallis and Futuna</option>
                          <option value="EH">Western Sahara</option>
                          <option value="WS">Western Samoa</option>
                          <option value="YE">Yemen</option>
                          <option value="ZM">Zambia</option>
                          <option value="ZW">Zimbabwe</option>
                        </select>
                      </div>
                      <input className="form-input input-keysearch mr-10" type="text" placeholder="Your keyword... " />
                      <button className="btn btn-default btn-find font-sm">Search</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="section-box mt-30">
            <div className="container">
              <div className="row flex-row-reverse">
                <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                  <div className="content-page">
                    <div className="box-filters-job">
                      <div className="row">
                        <div className="col-xl-6 col-lg-5">
                          <span className="text-small text-showing">
                            Showing <strong>41-60 </strong>of <strong>944 </strong>jobs
                          </span>
                        </div>
                        <div className="col-xl-6 col-lg-7 text-lg-end mt-sm-15">
                          <div className="display-flex2">
                            <div className="box-border mr-10">
                              <span className="text-sortby">Show:</span>
                              <div className="dropdown dropdown-sort">
                                <button className="btn dropdown-toggle" id="dropdownSort" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                  <span>12</span>
                                  <i className="fi-rr-angle-small-down" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort">
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item active">10</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">12</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">20</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="box-border">
                              <span className="text-sortby">Sort by:</span>
                              <div className="dropdown dropdown-sort">
                                <button className="btn dropdown-toggle" id="dropdownSort2" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-display="static">
                                  <span>Newest Post</span>
                                  <i className="fi-rr-angle-small-down" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownSort2">
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item active">Newest Post</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">Oldest Post</span>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <span className="dropdown-item">Rating Post</span>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="box-view-type">
                              <Link href="/jobs-list">
                                <span className="view-type">
                                  <img src="assets/imgs/template/icons/icon-list.svg" alt="jobBox" />
                                </span>
                              </Link>

                              <Link href="/jobs-grid">
                                <span className="view-type">
                                  <img src="assets/imgs/template/icons/icon-grid-hover.svg" alt="jobBox" />
                                </span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                      {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>No saved jobs found.</p>
        ) : (
                    <div className="row display-list">
                      {jobs && jobs.map((job) => (
                        <div className="col-xl-12 col-12" key={job.id}>
                          <div className="card-grid-2 hover-up">
                            <span className="flash" />
                            <div className="row">
                              <div className="col-lg-6 col-md-6 col-sm-12">
                              <div className="card-grid-2-image-left">
                                <div className="image-box">
                                  <img src="assets/imgs/brands/brand-1.png" alt="jobBox" />
                                </div>
                                <div className="right-info">
                                  <Link href="#">
                                    <span className="name-job">{job.jobTitle}</span>
                                  </Link>
                                  <span className="location-small">New York, US</span>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6 text-start text-md-end pr-60 col-md-6 col-sm-12">
                              <div className="pl-15 mb-15 mt-30">
                               {Array.isArray(job.requiredSkills) &&
                                job.requiredSkills.map((skill: string, index: number) => (
                                  <Link href="#" key={index}>
                                    <span className="btn btn-grey-small mr-2">{skill}</span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="card-block-info">
                            <h4>
                              <Link href="/job-details">
                                <span>UI / UX Designer fulltime</span>
                              </Link>
                            </h4>
                            <div className="mt-5">
                              <span className="card-briefcase">Fulltime</span>
                              <span className="card-time">
                                <span>4</span>
                                <span> mins ago</span>
                              </span>
                            </div>
                            <p className="font-sm color-text-paragraph mt-10">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae architecto eveniet, dolor quo repellendus pariatur</p>
                            <div className="card-2-bottom mt-20">
                              <div className="row">
                                <div className="col-lg-7 col-7">
                                  <span className="card-text-price">$500</span>
                                  <span className="text-muted">/Hour</span>
                                </div>
                                <div className="col-lg-5 col-5 text-end">
                                 <button
               onClick={() => setModalJob(job)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                  Apply Now
                </button>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                      ))}


                    </div>
                      )}
                  </div>
                     {/* Popup Modal */}
      {modalJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">
              Apply for {modalJob.jobTitle}
            </h2>

            {/* Dropdown resume có sẵn */}
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            >
              <option value="">-- Chọn Resume có sẵn --</option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.title || `Resume #${resume.id}`}
                </option>
              ))}
            </select>

            {/* Resume link */}
            <input
              type="text"
              placeholder="Resume Link"
              value={resumeLink}
              onChange={(e) => setResumeLink(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
            />

            {/* Upload file */}
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full mb-3"
            />

            {/* Cover Letter */}
            <textarea
              placeholder="Cover Letter"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-2 mb-3 rounded"
              rows={4}
            />

            {/* Progress bar */}
            {progress > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setModalJob(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApply(modalJob.id)}
                disabled={submitting}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {submitting ? "Applying..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
                  <div className="paginations">
                    <ul className="pager">
                      <li>
                        <a className="pager-prev" href="#" />
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">1</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">2</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">3</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">4</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">5</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number active">6</span>
                        </Link>
                      </li>
                      <li>
                        <Link href="#">
                          <span className="pager-number">7</span>
                        </Link>
                      </li>
                      <li>
                        <a className="pager-next" href="#" />
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-12">
                  <div className="sidebar-shadow none-shadow mb-30">
                    <div className="sidebar-filters">
                      <div className="filter-block head-border mb-30">
                        <h5>
                          Advance Filter
                          <Link href="#">
                            <span className="link-reset">Reset</span>
                          </Link>
                        </h5>
                      </div>
                      <div className="filter-block mb-30">
                        <div className="form-group select-style select-style-icon">
                          <select className="form-control form-icons select-active">
                            <option>New York, US</option>
                            <option>London</option>
                            <option>Paris</option>
                            <option>Berlin</option>
                          </select>
                          <i className="fi-rr-marker" />
                        </div>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-15">Industry</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">All</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">180</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Software</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Finance</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">23</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Recruting</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">43</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Management</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Advertising</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">76</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-25">Salary Range</h5>
                        <div className="list-checkbox pb-20">
                          <div className="row position-relative mt-10 mb-20">
                            <div className="col-sm-12 box-slider-range">
                              <div id="slider-range" />
                            </div>
                            <div className="box-input-money">
                              <input className="input-disabled form-control min-value-money" type="text" name="min-value-money" disabled={true} defaultValue="" />
                              <input className="form-control min-value" type="hidden" name="min-value" defaultValue="" />
                            </div>
                          </div>
                          <div className="box-number-money">
                            <div className="row mt-30">
                              <div className="col-sm-6 col-6">
                                <span className="font-sm color-brand-1">$0</span>
                              </div>
                              <div className="col-sm-6 col-6 text-end">
                                <span className="font-sm color-brand-1">$500</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group mb-20">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">All</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">145</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$0k - $20k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$20k - $40k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">37</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$40k - $60k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">75</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$60k - $80k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">98</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$80k - $100k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">14</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">$100k - $200k</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">25</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Popular Keyword</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">Software</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Developer</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Web</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">57</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Position</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Senior</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">Junior</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">35</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Fresher</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Experience Level</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Internship</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">56</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Entry Level</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">87</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">Associate</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Mid Level</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">45</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Director</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">76</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Executive</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">89</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Onsite/Remote</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">On-site</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">12</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">Remote</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Hybrid</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">58</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-30">
                        <h5 className="medium-heading mb-10">Job Posted</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">All</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">1 day</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">65</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">7 days</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">24</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">30 days</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">56</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="filter-block mb-20">
                        <h5 className="medium-heading mb-15">Job type</h5>
                        <div className="form-group">
                          <ul className="list-checkbox">
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Full Time</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">25</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" defaultChecked={true} />
                                <span className="text-small">Part Time</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">64</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Remote Jobs</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">78</span>
                            </li>
                            <li>
                              <label className="cb-container">
                                <input type="checkbox" />
                                <span className="text-small">Freelancer</span>
                                <span className="checkmark" />
                              </label>
                              <span className="number-item">97</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
         
  
          <section className="section-box mt-50 mb-50">
            <div className="container">
              <div className="text-start">
                <h2 className="section-title mb-10 wow animate__animated animate__fadeInUp">News and Blog</h2>
                <p className="font-lg color-text-paragraph-2 wow animate__animated animate__fadeInUp">Get the latest news, updates and tips</p>
              </div>
            </div>
            <div className="container">
              <div className="mt-50">
                <div className="box-swiper style-nav-top">
                  <BlogSlider />
                </div>
                <div className="text-center">
                  <Link href="blog-grid">
                    <span className="btn btn-brand-1 btn-icon-load mt--30 hover-up">Load More Posts</span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
          <section className="section-box mt-50 mb-20">
            <div className="container">
              <div className="box-newsletter">
                <div className="row">
                  <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                    <img src="assets/imgs/template/newsletter-left.png" alt="joxBox" />
                  </div>
                  <div className="col-lg-12 col-xl-6 col-12">
                    <h2 className="text-md-newsletter text-center">
                      New Things Will Always
                      <br /> Update Regularly
                    </h2>
                    <div className="box-form-newsletter mt-40">
                      <form className="form-newsletter">
                        <input className="input-newsletter" type="text" placeholder="Enter your email here" />
                        <button className="btn btn-default font-heading icon-send-letter">Subscribe</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-xl-3 col-12 text-center d-none d-xl-block">
                    <img src="assets/imgs/template/newsletter-right.png" alt="joxBox" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
