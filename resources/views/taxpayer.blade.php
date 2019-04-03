@extends('spark::layouts.app')

@section('content')
    <form  action="{{ route('postTaxPayer') }}" method="POST">
        {{ csrf_field() }}
        <input type="hidden" name="id" value="{{ $Integration->id }}" />
        <b-container>
            <b-row>
                <b-col cols="4">
                    <b-card no-body img-src="https://placekitten.com/380/200" img-alt="Image" img-top >

                        <h4 slot="header">{{ $Integration->taxpayer->alias }}</h4>

                        <b-card-body>
                            <b-card-title>{{ $Integration->taxpayer->name }}</b-card-title>
                            <b-card-sub-title class="mb-2">{{ $Integration->taxpayer->taxid }}</b-card-sub-title>
                        </b-card-body>

                        <b-list-group flush>
                            <b-list-group-item>
                                [Blank]
                                <b-badge pill variant="success">Personal</b-badge>
                            </b-list-group-item>
                            <b-list-group-item>
                                [Blank]
                                <b-badge pill variant="danger">Accountant</b-badge>
                            </b-list-group-item>
                            <b-list-group-item>
                                [Blank]
                                <b-badge pill variant="info">Auditor</b-badge>
                            </b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-col>

                <b-col cols="8">

                    <h3>
                        <b-button type="submit">Save</b-button>
                        Configuration
                    </h3>

                    <b-card no-body>
                        <b-tabs pills card v-model="tabIndex">
                            <b-tab active>
                                <template slot="title">
                                    <i class="material-icons">info</i>
                                    Information
                                </template>

                                <b-form-group label="Tax Identification" label-size="sm">
                                    <b-form-input name="taxid" type="text" value="{{$Integration->taxpayer->taxid}}"/>
                                </b-form-group>

                                <b-form-group label="Taxpayer's Name" label-size="sm">
                                    <b-form-input name="name" type="text" value="{{$Integration->taxpayer->name}}"></b-form-input>
                                </b-form-group>

                                <b-form-group label="Alias">
                                    <b-form-input name="alias" type="text" value="{{$Integration->taxpayer->alias}}"></b-form-input>
                                </b-form-group>

                                <hr>
                                <b-row>
                                    <b-col>
                                        <b-form-checkbox checked="{{$Integration->taxpayer->is_company}}" name="check-button" switch>
                                                This taxpayer is a Company
                                        </b-form-checkbox>
                                        <b-form-group label="Agent Name" label-size="sm">
                                            <b-form-input name="alias" type="text" value="{{$Integration->taxpayer->agent_name}}"></b-form-input>
                                        </b-form-group>
                                        <b-form-group label="Agent TaxID" label-size="sm">
                                            <b-form-input name="alias" type="text" value="{{$Integration->taxpayer->agent_taxid}}"></b-form-input>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group label="Telephone" label-size="sm">
                                            <b-form-input name="telephone" type="text" value="{{$Integration->taxpayer->telephone}}"/>
                                        </b-form-group>
        
                                        <b-form-group label="Address" label-size="sm">
                                            <b-form-input name="address" type="text" value="{{$Integration->taxpayer->address}}"/>
                                        </b-form-group>
        
                                        <b-form-group label="Email" label-size="sm">
                                            <b-form-input name="email" type="text" value="{{$Integration->taxpayer->email}}"/>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-tab>
                                <b-tab>
                                    <template slot="title">
                                        <i class="material-icons">settings</i>
                                        Settings
                                    </template>

                                    <h3>Show Modules</h3>
                                    <hr>

                                    <br>
                                    <h6>General Modules</h6>
                                    <b-form-checkbox checked="{{$Integration->taxpayer->show_inventory}}" name="check-button" switch>
                                        Inventory
                                    </b-form-checkbox>
                                    <b-form-checkbox checked="{{$Integration->taxpayer->show_production}}" name="check-button" switch>
                                        Production
                                    </b-form-checkbox>
                                    <b-form-checkbox checked="{{$Integration->taxpayer->show_fixedasset}}" name="check-button" switch>
                                        Fixed Assets
                                    </b-form-checkbox>

                                    <br>
                                    <h6>Internacional Commerce</h6>
                                    <b-form-checkbox checked="{{$Integration->taxpayer->does_imports}}" name="check-button" switch>
                                        Importation
                                    </b-form-checkbox>
                                    <b-form-checkbox checked="{{$Integration->taxpayer->does_exports}}" name="check-button" switch>
                                        Exportation
                                    </b-form-checkbox>
                                </b-tab>
                                    <b-tab>
                                        <template slot="title">
                                            <i class="material-icons">supervised_user_circle</i>
                                            Integrations
                                        </template>
                                            <b-form-group label="Type">
                                            <b-form-select name="type" class="mb-3" value="{{$Integration->type}}">
                                            <option value="1">Company</option>
                                            <option value="2">Accountant</option>
                                            <option value="3" >Auditor</option>
                                            </b-form-select>
                                            
                                        </b-form-group>

                                    </b-tab>
                                    <b-tab>
                                        <template slot="title">
                                            <i class="material-icons">notifications</i>
                                            Notifications
                                        </template>
                                        <b-form-group label="Deadline">
                                            <b-form-select name="deadline" class="mb-3" value="{{$Integration->notification_monthly}}">
                                                <option :value="0">0</option>
                                                <option value="1">1</option>
                                                <option value="2" >2</option>
                                                <option value="3">3</option>
                                                <option value="4" >4</option>
                                                <option value="5">5</option>
                                                <option value="6" >6</option>
                                                <option value="7">7</option>
                                                <option value="8" >8</option>
                                                <option value="9">9</option>
                                                <option value="10" >10</option>
                                                <option value="11">11</option>
                                                <option value="12" >12</option>
                                                <option value="13">13</option>
                                                <option value="14" >14</option>
                                                <option value="15">15</option>
                                                <option value="16" >16</option>
                                                <option value="17">17</option>
                                                <option value="18" >18</option>
                                                <option value="19">19</option>
                                                <option value="20" >20</option>
                                                <option value="21">21</option>
                                                <option value="22" >22</option>
                                                <option value="23">23</option>
                                                <option value="24" >24</option>
                                                <option value="25">25</option>
                                                <option value="26" >26</option>
                                                <option value="27">27</option>
                                                <option value="28" >28</option>
                                                <option value="29">29</option>
                                                <option value="30" >30</option>
                                            </b-form-select>
                                            
                                            <br>
                                            <h6>How often would you like to receive Email Summaries of this Taxpayer</h6>
                                            <b-form-checkbox checked="{{$Integration->notification_quarterly}}" name="check-button" switch>
                                                Quarterly Notification
                                            </b-form-checkbox>
                                            <b-form-checkbox checked="{{$Integration->notification_semesterly}}" name="check-button" switch>
                                                Semesterly Notification
                                            </b-form-checkbox>
                                            <b-form-checkbox checked="{{$Integration->notification_yearly}}" name="check-button" switch>
                                                Yearly Notification
                                            </b-form-checkbox>
        
                                            <br>
                                            <h6>Sync</h6>
                                            <b-form-checkbox checked="{{$Integration->notification_sync}}" name="check-button" switch>
                                                Notify each time a user Sync's data
                                            </b-form-checkbox>

                                        </b-form-group>
                                    </b-tab>
                                </b-tabs>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-container>
            </form>
        @endsection
