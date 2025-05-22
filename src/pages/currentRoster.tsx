import '../App.css';
import '../css/currentRoster.css';

function currentRoster() {
  return (
    <>
      <div className="main-content-with-bg">
        <div className="background-logo" />
        <h1 className="branding">Current Roster</h1>
        <div className="main-content-inner"></div>
        <div className="roster-container">
          <table className="mavs-roster">
            <thead>
              <tr>
                <th>NAME</th>
                <th>POS</th>
                <th>AGE</th>
                <th>HT</th>
                <th>WT</th>
                <th>SALARY</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Max Christie</td>
                <td>G</td>
                <td>22</td>
                <td>6'5"</td>
                <td>190 lbs</td>
                <td>$7,142,857</td>
              </tr>
              <tr>
                <td>Anthony Davis</td>
                <td>PF</td>
                <td>32</td>
                <td>6'10"</td>
                <td>253 lbs</td>
                <td>$43,219,440</td>
              </tr>
              <tr>
                <td>Spencer Dinwiddie</td>
                <td>PG</td>
                <td>32</td>
                <td>6'5"</td>
                <td>215 lbs</td>
                <td>$2,087,519</td>
              </tr>
              <tr title="Free Agent">
                <td>Kessler Edwards *</td>
                <td>SF</td>
                <td>24</td>
                <td>6'7"</td>
                <td>203 lbs</td>
                <td>--</td>
              </tr>
              <tr>
                <td>Dante Exum</td>
                <td>G</td>
                <td>29</td>
                <td>6'5"</td>
                <td>214 lbs</td>
                <td>$3,150,000</td>
              </tr>
              <tr>
                <td>Daniel Gafford</td>
                <td>C</td>
                <td>26</td>
                <td>6'10"</td>
                <td>265 lbs</td>
                <td>$13,394,160</td>
              </tr>
              <tr>
                <td>Jaden Hardy</td>
                <td>G</td>
                <td>22</td>
                <td>6'3"</td>
                <td>198 lbs</td>
                <td>$2,019,699</td>
              </tr>
              <tr>
                <td>Kyrie Irving</td>
                <td>PG</td>
                <td>33</td>
                <td>6'2"</td>
                <td>195 lbs</td>
                <td>$41,000,000</td>
              </tr>
              <tr>
                <td>Kai Jones</td>
                <td>PF</td>
                <td>24</td>
                <td>6'11"</td>
                <td>221 lbs</td>
                <td>$2,196,970</td>
              </tr>
              <tr>
                <td>Dereck Lively II</td>
                <td>C</td>
                <td>21</td>
                <td>7'1"</td>
                <td>230 lbs</td>
                <td>$5,014,560</td>
              </tr>
              <tr>
                <td>Naji Marshall</td>
                <td>SF</td>
                <td>27</td>
                <td>6'6"</td>
                <td>220 lbs</td>
                <td>$8,571,429</td>
              </tr>
              <tr>
                <td>Caleb Martin</td>
                <td>SF</td>
                <td>29</td>
                <td>6'5"</td>
                <td>205 lbs</td>
                <td>$8,149,001</td>
              </tr>
              <tr>
                <td>Dwight Powell</td>
                <td>C</td>
                <td>33</td>
                <td>6'10"</td>
                <td>240 lbs</td>
                <td>$4,000,000</td>
              </tr>
              <tr>
                <td>Olivier-Maxence Prosper</td>
                <td>F</td>
                <td>22</td>
                <td>6'7"</td>
                <td>230 lbs</td>
                <td>$2,869,920</td>
              </tr>
              <tr>
                <td>Klay Thompson</td>
                <td>SG</td>
                <td>35</td>
                <td>6'5"</td>
                <td>220 lbs</td>
                <td>$15,873,016</td>
              </tr>
              <tr>
                <td>P.J. Washington</td>
                <td>PF</td>
                <td>26</td>
                <td>6'6"</td>
                <td>230 lbs</td>
                <td>$15,500,000</td>
              </tr>
              <tr title="Free Agent">
                <td>Brandon Williams *</td>
                <td>G</td>
                <td>25</td>
                <td>6'1"</td>
                <td>190 lbs</td>
                <td>--</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="free-agent-note">* Indicates Free Agent</p>
      </div>
    </>
  );
}

export default currentRoster;
