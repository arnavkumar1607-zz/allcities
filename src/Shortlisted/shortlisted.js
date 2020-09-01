import React from 'react';
import * as _ from 'lodash';

class Shortlisted extends React.Component {

    state = {};

    constructor(props) {
        super(props);
        this.state = {
            shortlisted: []
        }
    }

    componentDidMount() {
        if (localStorage.getItem('shortlisted') != undefined && localStorage.getItem('shortlisted') != 'undefined' && localStorage.getItem('shortlisted') != null) {
            this.setState({ shortlisted: JSON.parse(localStorage.getItem('shortlisted')) });
        }
    }

    manipulateData(index) {
        let st = [];
        let deleted = {};
        if (!_.isEmpty(JSON.parse(localStorage.getItem('shortlisted')))) {
            st = JSON.parse(localStorage.getItem('shortlisted'));
            deleted = st.splice(index, 1);
            localStorage.setItem('shortlisted', JSON.stringify(st));
            this.setState({ shortlisted: st });
            alert('Record deleted.')
        }
    }

    render() {
        if(_.isEmpty(this.state.shortlisted))
        return <div style={{ textAlign : "center"}}>No data. Go to All Cities to Shortlist.</div>
        else
        return (
            <div className="AllCities">
                <div className="allcitiesTable">
                    <table>
                        <th>City</th>
                        <th>District</th>
                        <th>State</th>
                        <th>Remove</th>
                        {this.state.shortlisted.map((c, index) => {
                            return (
                                <tr>
                                    <td style={{ background: index % 2 == 0 ? 'white' : 'whitesmoke' }}>{c.City}</td>
                                    <td style={{ background: index % 2 == 0 ? 'white' : 'whitesmoke' }}>{c.District}</td>
                                    <td style={{ background: index % 2 == 0 ? 'white' : 'whitesmoke' }}>{c.State}</td>
                                    <td onClick={() => this.manipulateData(index)} style={{ textAlign: "center", background: index % 2 == 0 ? 'white' : 'whitesmoke', fontsize: 11, borderRadius: 4 }}>Remove</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        )
    }
}

export default Shortlisted;