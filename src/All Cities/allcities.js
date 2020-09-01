import React from 'react';
import '../All Cities/allcities.scss';
import * as _ from 'lodash';

class Allcities extends React.Component {

    state = {};
    allCityData = [];

    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            states: [],
            dist: [],
            cityPopup: false
        }
    }


    componentDidMount() {
        if (_.isEmpty(JSON.parse(localStorage.getItem('allcities')))) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "https://next.json-generator.com/api/json/get/EJX4SGwfK", true);
            xhr.onload = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        let allcities = JSON.parse(xhr.responseText).data;
                        allcities.map((m) => {
                            if (this.state.states.indexOf(m.State) < 0) {
                                this.state.states.push(m.State);
                            }
                            if (this.state.dist.indexOf(m.District) < 0) {
                                this.state.dist.push(m.District);
                            }
                            return '';
                        });
                        localStorage.setItem('allcities', JSON.stringify(allcities));
                        this.allCityData = allcities;
                        this.setState({ cities: allcities });
                    } else {
                        console.error(xhr.statusText);
                    }
                }
            }.bind(this);
            xhr.onerror = function (e) {
                console.error(xhr.statusText);
            };
            xhr.send(null);
        } else {
            this.allCityData = JSON.parse(localStorage.getItem('allcities'));
            this.allCityData.map((m) => {
                if (this.state.states.indexOf(m.State) < 0) {
                    this.state.states.push(m.State);
                }
                if (this.state.dist.indexOf(m.District) < 0) {
                    this.state.dist.push(m.District);
                }
                return '';
            });
            this.setState({ cities: JSON.parse(localStorage.getItem('allcities')) });
        }
    }

    manipulateData(action, data) {
        if (window.Storage != undefined) {
            if (action === 'shortlist') {
                let st = [];
                if (localStorage.getItem('shortlisted') != undefined && localStorage.getItem('shortlisted') != 'undefined' && localStorage.getItem('shortlisted') != null && !_.isEmpty(localStorage.getItem('shortlisted'))) {
                    st = JSON.parse(localStorage.getItem('shortlisted'));
                    st.push(this.state.cities[data]);
                } else {
                    st.push(this.state.cities[0]);
                }
                localStorage.setItem('shortlisted', JSON.stringify(st));
                alert("Shortlisted");
            } else {
                let st = [];
                let deleted = {};
                let ac = [];
                if (!_.isEmpty(JSON.parse(localStorage.getItem('allcities')))) {
                    ac = JSON.parse(localStorage.getItem('allcities'));
                }
                if (localStorage.getItem('shortlisted') != undefined && localStorage.getItem('shortlisted') != 'undefined' && localStorage.getItem('shortlisted') != null) {
                    st = JSON.parse(localStorage.getItem('shortlisted'));
                }
                if (!_.isEmpty(st)) {
                    st.splice(data, 1);
                    localStorage.setItem('shortlisted', JSON.stringify(st));
                }
                if (!_.isEmpty(ac)) {
                    deleted = ac.splice(data, 1);
                    alert('Deleted record for : ' + JSON.stringify(deleted));
                    localStorage.setItem('allcities', JSON.stringify(ac));
                    this.allCityData = JSON.parse(localStorage.getItem('allcities'));
                    this.setState({ cities: JSON.parse(localStorage.getItem('allcities')) });
                }
            }
        }
    }

    searchItems() {
        this.state.cities = this.allCityData;
        let c = document.getElementById('city').value.toLowerCase();
        let d = document.getElementById('dist').value.toLowerCase();
        let s = document.getElementById('state').value.toLowerCase();
        let searchData = [];
        searchData = this.state.cities.map((m) => {
            if (!_.isEmpty(c) && !_.isEmpty(d) && !_.isEmpty(s) && m.City.toLowerCase() === c && m.District.toLowerCase() === d && m.State.toLowerCase() === s) {
                return m;
            } else if (!_.isEmpty(c) && !_.isEmpty(d) && _.isEmpty(s) && m.City.toLowerCase() === c && m.District.toLowerCase() === d) {
                return m;
            } else if (!_.isEmpty(d) && !_.isEmpty(d) && _.isEmpty(c) && m.District.toLowerCase() === d && m.State.toLowerCase() === s) {
                return m;
            } else if (!_.isEmpty(c) && !_.isEmpty(s) && _.isEmpty(d) && m.City.toLowerCase() === c && m.State.toLowerCase() === s) {
                return m;
            } else if (!_.isEmpty(c) && _.isEmpty(d) && _.isEmpty(s) && m.City.toLowerCase() === c) {
                return m;
            } else if (_.isEmpty(c) && !_.isEmpty(d) && _.isEmpty(s) && m.District.toLowerCase() === d) {
                return m;
            } else if (_.isEmpty(c) && _.isEmpty(d) && !_.isEmpty(s) && m.State.toLowerCase() === s) {
                return m;
            }
        });
        this.setState({ cities: searchData });

    }

    resetItems() {
        if (!_.isEmpty(JSON.parse(localStorage.getItem('allcities')))) {
            this.allCityData = JSON.parse(localStorage.getItem('allcities'));
            this.setState({ cities: this.allCityData });
        }
    }

    startaddCity() {
        let hl = document.getElementById('overlay');
        let el = document.getElementById('addcity');
        if (!_.isEmpty(el)) {
            el.style.display = 'block';
        }
        if (!_.isEmpty(hl)) {
            hl.style.display = 'block';
        }
    }

    removeAddCity() {
        let hl = document.getElementById('overlay');
        let el = document.getElementById('addcity');
        if (!_.isEmpty(el)) {
            el.style.display = 'none';
        }
        if (!_.isEmpty(hl)) {
            hl.style.display = 'none';
        }
    }

    AddCity() {
        let city = document.getElementById('entercity').value;
        let dist = document.getElementById('seldist').value;
        let state = document.getElementById('selstate').value;
        let d = { City: city, State: state, District: dist };
        let newcities = [];
        if (!_.isEmpty(JSON.parse(localStorage.getItem('allcities')))) {
            newcities = JSON.parse(localStorage.getItem('allcities'));
            newcities.push(d);
            localStorage.setItem('allcities', JSON.stringify(newcities));
            this.allCityData = newcities;
        } else {
            newcities.push(d);
            localStorage.setItem('allcities', JSON.stringify(newcities));
            this.allCityData = newcities;
        }
        this.setState({ cities: newcities });
        this.removeAddCity();
        alert('City Added');
    }


    render() {
        return (
            <div className="AllCities">
                <div id="overlay"></div>
                <div id="addcity">
                    <div>
                        <input id="entercity" type="textbox" name="City" placeholder="Enter City" />
                        <div for="seldist">Select District</div>
                        <select name="seldist" id="seldist">
                            {_.sortBy(this.state.dist).map((m) => {
                                return <option value={m}>{m}</option>
                            })};
                                </select>
                        <div for="selstate">Select State</div>
                        <select name="selstate" id="selstate">
                            {_.sortBy(this.state.states).map((m) => {
                                return <option value={m}>{m}</option>
                            })};
                                </select>
                        <div className="actionbtn">
                            <button class="btns" name="reset" value="Reset" onClick={() => this.removeAddCity()}>Cancel</button>
                            <button class="btns" name="reset" value="Reset" onClick={() => this.AddCity()}>Add City</button>
                        </div>
                    </div>
                </div>
                <div className="search">
                    <div>
                        <input id="city" type="textbox" name="City" placeholder="Enter City" />
                        <input id="dist" type="textbox" name="district" placeholder="Enter District" />
                        <input id="state" type="textbox" name="state" placeholder="Enter State" />
                    </div>
                    <div>
                        <button class="btns" name="search" value="Search" onClick={() => this.searchItems()}>Search</button>
                        <button class="btns" name="reset" value="Reset" onClick={() => this.resetItems()}>Reset</button>
                        <button class="btns" name="reset" value="Reset" onClick={() => this.startaddCity()}>Add City</button>
                    </div>
                </div>
                <div className="allcitiesTable" style={{ height : window.innerHeight - 150}}>
                    <table>
                        <th>City</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Shortlist</th>
                        <th>Delete</th>
                        {this.state.cities.map((c, index) => {
                            if (c === undefined)
                                return;
                            else
                                return (
                                    <tr>
                                        <td style={{ background: index % 2 == 0 ? 'white' : '#e6f7ff', fontWeight: index % 2 == 0 ? '' : 400 }}>{c.City}</td>
                                        <td style={{ background: index % 2 == 0 ? 'white' : '#e6f7ff', fontWeight: index % 2 == 0 ? '' : 400 }}>{c.District}</td>
                                        <td style={{ background: index % 2 == 0 ? 'white' : '#e6f7ff', fontWeight: index % 2 == 0 ? '' : 400 }}>{c.State}</td>
                                        <td className="btn" onClick={() => this.manipulateData('shortlist', index)} style={{ textAlign: "center", background: index % 2 == 0 ? 'white' : '#e6f7ff', fontsize: 11, borderRadius: 4, fontWeight: index % 2 == 0 ? '' : 400 }}>Shortlist</td>
                                        <td className="btn" onClick={() => this.manipulateData('remove', index)} style={{ textAlign: "center", background: index % 2 == 0 ? 'white' : '#e6f7ff', fontsize: 11, borderRadius: 4, fontWeight: index % 2 == 0 ? '' : 400 }}>Delete</td>
                                    </tr>
                                )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

export default Allcities;