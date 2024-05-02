<template>
    <main id="content" role="main" class="main">
        <!-- Content -->
        <div class="content container-fluid">
            <div class="row">
                <div class="col-4 d-flex align-items-end">
            <ul class="breadcrumb m-1 mt-0">
                <li>
                    <router-link to="/dashboard">
                        <a href="#"><i class="bi-house-door"></i></a>
                    </router-link>
                </li>
                <li>Routing</li>
            </ul>
        </div>
        <div class="col-4 text-center">
            <span class="h2">List Routing</span>
        </div>
        <hr class="mb-3 mt-1">
            </div>
            <!-- Page Header -->
            <div class="card">
                <!-- Header -->
                <b-row>
                    <b-col class="d-flex align-items-center">
                        <b-input-group size="sm" class="mx-2">
                            <b-form-input id="filter-input" v-model="filter" type="search"
                                pleaceholder="Type to Search"></b-form-input>

                            <b-input-group-append>
                                <b-button size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col class="d-flex justify-content-end align-items-center">
                        <b-button v-b-modal.modal-add variant="primary" size="sm"><i class="bi-plus-circle"></i></b-button>
                        <b-dropdown id="dropdown-right" right text="Filter Column" variant="dark" class="m-2" size="sm">
                            <template #button-content>
                                <i class="bi-sliders"></i>
                            </template>
                            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="fields"
                                name="flavour-1" buttons>
                            </b-form-checkbox-group>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <!-- Main Table -->
                <b-table ref="tableItem" label-sort-asc="" label-sort-desc="" label-sort-clear="" :bordered="true"
                    stacked="md" :items="Item" :fields="activeFields" :current-page="currentPage" :per-page="perPage"
                    :filter="filter" :td-class="mainTable" @filtered="onFiltered" v-if="selected.length > 0">>
                    <template #cell(opsi)="row" class="justify-content-center" style="width: 100px">
                        <div width="0px">
                            <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                                <template #button-content>
                                    <i class="bi-gear-fill"></i>
                                </template>
                                <b-dropdown-item href="#"
                                    @click="info(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#"
                                    @click="edit(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete('Item', row.item)">Hapus</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template #cell(routingConfirm)="data">
                        <template v-for="confirm in data.value">
                            <p class="m-0">{{ confirm.no }}. {{ confirm.userLogic[0].userId.userName }}
                                <b v-if="confirm.logic === 'next' || confirm.logic === 'end'"> (Only) </b>
                                <span v-else> <b>{{ confirm.logic }}</b> {{ confirm.userLogic.length - 1 }} User lain</span>
                            </p>
                        </template>
                    </template>
                </b-table>

                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" no-close-on-esc
                    no-close-on-backdrop hide-header-close>
                    <div class="row">
                        <div class="col-5 d-flex justify-content-between"><span>Routing Process</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.routingAppProcess }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Routing Name</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.routingName }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Routing Group</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.routingGroup }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Eff. Date</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.routingEfectiveDate }}</div>
                        <div class="col-md-12 mt-4">
                            <!-- info Modal -->
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Routing Confirm</span>
                                <div class="d-flex align-items-center">
                                    <button v-if="showAddress" @click="showAddress = !showAddress" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showAddress = !showAddress" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showAddress" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col" class="text-center">User</th>
                                        <th scope="col" class="text-center">Condition</th>
                                        <th scope="col" class="text-center">More User</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="address in infoModal.content.routingConfirm">
                                        <td class="align-top">{{ address.no }}</td>
                                        <td class="align-top">{{ address.userLogic[0].userId.userName }}</td>
                                        <td class="align-top text-center">{{ address.logic }}</td>
                                        <td>
                                            <p class="m-0" v-for="(user, index) in address.userLogic"><template
                                                    v-if="index > 0">- {{ user.userId.userName }}</template></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <template #modal-footer>
                        <div v-if="dataId !== '' && procId !== '' && microId !== ''"
                            class="w-100 d-flex justify-content-end">
                            <b-button variant="secondary" size="sm" @click="microId = ''">
                                Kembali
                            </b-button>
                        </div>
                        <div v-else-if="dataId !== '' && procId !== '' && microId == ''"
                            class="w-100 d-flex justify-content-end">
                            <b-button class="me-2" variant="secondary" size="sm" @click="$bvModal.hide('info-modal')">
                                Kembali
                            </b-button>
                            <b-button size="sm" variant="primary" @click="addMicroservice">Tambah Micro</b-button>
                        </div>
                        <div v-else class="w-100 d-flex justify-content-end">
                            <b-button class="me-2" variant="secondary" size="sm" @click="$bvModal.hide('info-modal')">
                                Kembali
                            </b-button>
                        </div>
                    </template>
                </b-modal>
                <b-modal :id="procModal.id" :title="procModal.title" stacked @ok="addProcModal" ok-title="Tambah Proses"
                    cancel-title="Kembali">
                    <div class="row">
                        <!-- App Proc Table -->
                        <b-table ref="tableProc" hover :fields="procFields" :items="process">
                            <template #cell(opsiProc)="row" style="width: 100px">
                                <div width="0px">
                                    <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                                        <template #button-content>
                                            <i class="bi-gear-fill"></i>
                                        </template>
                                        <b-dropdown-item href="#"
                                            @click="infoProc(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                        <b-dropdown-item href="#"
                                            @click="editProcModal(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                        <b-dropdown-item href="#" @click="alertDelete">Hapus</b-dropdown-item>
                                    </b-dropdown>
                                </div>
                            </template>
                            {{ process }}
                        </b-table>
                    </div>
                </b-modal>

                <b-modal :id="editModal.id" :title="editModal.title" @hidden="resetEditModal" @ok="handleEdit"
                    ok-variant="success" ok-title="Edit" cancel-title="Kembali">

                    <form ref="form" class="row" @submit.stop.prevent="handleEditSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Group Routing
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemCode" :state="typeState">
                                <multiselect id="Condition" v-model="type" :options="filterGroup" placeholder="Select one"
                                    :multiple="false" :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nama Routing
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemName" invalid-feedback="Nama User Harus Diisi!" :state="NameState">
                                <b-form-input id="ItemName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Page Routing
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group invalid-feedback="Page Routing Harus Diisi!" :state="descState">
                                <multiselect id="taxType" v-model="desc" :options="optionsPage" :custom-label="customLabel1"
                                    placeholder="Select one" :multiple="false" :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Eff. Date
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemContact" invalid-feedback="Deskripsi Harus Diisi!"
                                :state="contactState">
                                <b-form-input type="date" id="ItemContact" v-model="contact" :state="contactState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <!-- edit data -->
                        <div class="col-md-12 mt-4">
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Routing Confirm </span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addAddress class="btn p-0" data-toggle="tooltip"
                                        title="Tambah Alamat">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showAddress" @click="showAddress = !showAddress" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showAddress = !showAddress" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showAddress" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col" class="text-center">User</th>
                                        <th scope="col" class="text-center">Condition</th>
                                        <th scope="col" class="text-center">More User</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(address, i) in optionAddress">
                                        <td class="align-top">{{ address.no }}</td>
                                        <td class="align-top">{{ address.userLogic[0].userId.userName }}</td>
                                        <td class="align-top text-center">{{ address.logic }}</td>
                                        <td>
                                            <p class="m-0" v-for="(user, index) in address.userLogic">
                                                <template v-if="index > 0">- {{ user.userId.userName }}</template>
                                            </p>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn p-0"
                                                @click="editAddress(address, i, $event.target)">
                                                <i class="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button type="button" class="btn p-0" @click="removeAddress(i)">
                                                <i class="bi bi-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </b-modal>
                <b-modal :id="editProc.id" :title="editProc.title" no-close-on-esc no-close-on-backdrop hide-header-close>
                    <form v-if="addressIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Nomor" label-for="nomor" invalid-feedback="Nomor Harus Diisi!"
                                :state="provState">
                                <b-form-input type="number" id="nomor" v-model="prov" :state="provState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Condition" label-for="usahaLokasi"
                                invalid-feedback="Condition Harus Diisi!" :state="kabState">
                                <multiselect @input="changeCondition" id="Condition" v-model="kab"
                                    :options="optionsCategory" placeholder="Select one" :multiple="false"
                                    :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="User" label-for="usahaLokasi" invalid-feedback="User Harus Diisi!"
                                :state="kecState">
                                <multiselect id="usahaLokasi" v-model="kec" :options="optionsUser" placeholder="Select one"
                                    :multiple="false" :show-labels="false" :custom-label="customLabel"
                                    :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div :class="kab === 'and' || kab === 'or' ? '' : 'd-none'"
                            class="d-flex justify-content-center w-100 my-2">
                            <div style="width: 90%; height: 16px; border-bottom: 1px solid black; text-align: center;">
                                <span style="font-size: 20px;background-color: #fff;padding: 0px 10px;"> More User
                                </span>
                            </div>
                        </div>
                        <div :class="kab === 'and' || kab === 'or' ? '' : 'd-none'" class="col-md-12 mt-4">
                            <b-form-group label="" label-for="usahaLocation" invalid-feedback="User Harus Diisi!"
                                :state="imageState">
                                <multiselect v-model="image" :options="optionsMoreUser" :multiple="true" :clear-on-select="false"
                                    :preserve-search="true" placeholder="Pick some" :custom-label="customLabel"
                                    track-by="_id">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                            class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                values.length }} options selected</span></template>
                                </multiselect>
                                <pre>
User List :
<template v-for="data in image">- {{ data.userName }} ({{ data.userType }})
</template>
  </pre>
                            </b-form-group>
                        </div>
                    </form>
                    <form v-else-if="contactIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nama
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                No. Telepon
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="contactPhone" invalid-feedback="Harga Harus Diisi!" :state="kabState">
                                <b-input-group prepend="+62">
                                    <b-form-input type="number" id="contactPhone" v-model="kab" :state="kabState"
                                        required></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </div>
                    </form>
                    <form v-else-if="paymentIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Tipe Payment
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nomor Payment
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="paymentNumber" invalid-feedback="Nomor Pembayaran Harus Diisi!"
                                :state="provState">
                                <b-form-input id="paymentNumber" type="number" v-model="kab" :state="provState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nama Payment
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="paymentName" invalid-feedback="Nama Pembayaran Harus Diisi!"
                                :state="provState">
                                <b-form-input id="paymentName" v-model="kec" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                    </form>
                    <form ref="form" @submit.stop.prevent="handleMicroEdit"
                        v-else-if="dataId !== '' && procId !== '' && microId !== ''">
                        <div v-if="!microVar" class="row">
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Nama
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="procName" invalid-feedback="Nama Microservice Harus Diisi!"
                                    :state="NameState">
                                    <b-form-input id="procName" v-model="name" :state="NameState" required></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Kode
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="procMicroCode" invalid-feedback="Kode Microservice Harus Diisi!"
                                    :state="descState">
                                    <b-input-group :prepend="this.infoModal.content.appProcCode + '.'">
                                        <b-form-input id="procMicroCode" type="number" v-model="microCode"
                                            :state="descState" required></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Tipe
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microType" invalid-feedback="Tipe Microservice Harus Diisi!"
                                    :state="typeState">
                                    <b-form-input id="microType" v-model="type" :state="typeState" required></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Deskripsi
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="procDesc">
                                    <b-form-input id="procDesc" v-model="desc"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Icon
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microIcon">
                                    <b-form-input id="microIcon" v-model="image"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Placeholder
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microPleaceholder">
                                    <b-form-input id="microPleaceholder" v-model="prov"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Routing
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microRouting">
                                    <b-form-input id="microRouting" v-model="kab"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Navigate
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microNaviagate">
                                    <b-form-input id="microNaviagate" v-model="kec"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    API Function Script
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microFunctionScript">
                                    <b-form-input id="microFunctionScript" v-model="prov"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-4 d-flex pt-3 justify-content-between">
                                <h4 class="m-0">
                                    Data
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microId">
                                    <b-form-textarea id="microId" v-model="id"></b-form-textarea>
                                </b-form-group>
                            </div>
                        </div>

                        <JsonEditorVue v-else style="height: 350px;" v-model="arrayVariable" Mode="text" :options="{
                            Mode: 'text',
                            Modes: ['text'],
                            onError: handleJsonError,
                        }"></JsonEditorVue>
                    </form>
                    <form ref="form" class="row" @submit.stop.prevent="handleProcEdit" v-else>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nama Proses*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procName" invalid-feedback="Nama Proses Harus Diisi!"
                                :state="NameState">
                                <b-form-input id="procName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Kode*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procCode" invalid-feedback="Kode Harus Diisi!" :state="descState">
                                <b-form-input id="procCode" v-model="id" :state="descState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Group App*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procGroup" invalid-feedback="Group App Harus Diisi!"
                                :state="typeState">
                                <b-form-input id="procGroup" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Deskripsi
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procDesc">
                                <b-form-input id="procDesc" v-model="desc"></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Routing*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procRouting" invalid-feedback="Routing Harus Diisi!"
                                :state="provState">
                                <b-form-input id="procRouting" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Icon
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procIcon">
                                <b-form-input id="procIcon" v-model="kab"></b-form-input>
                            </b-form-group>
                        </div>

                    </form>
                    <template #modal-footer v-if="addressIndex !== ''">
                        <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                        <b-button variant="success" @click="saveEditAddress">Edit</b-button>
                    </template>
                    <template #modal-footer v-else-if="contactIndex !== ''">
                        <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                        <b-button variant="success" @click="saveEditContact">Edit</b-button>
                    </template>
                    <template #modal-footer v-else-if="paymentIndex !== ''">
                        <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                        <b-button variant="success" @click="saveEditPayment">Edit</b-button>
                    </template>
                    <template #modal-footer v-else-if="dataId !== '' && procId !== '' && microId !== ''">
                        <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                        <b-button variant="success" @click="handleMicroEdit">Edit</b-button>
                    </template>
                    <template #modal-footer v-else>
                        <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                        <b-button variant="success" @click="handleProcEdit">Edit</b-button>
                    </template>
                </b-modal>
                <b-modal id="modal-add" size="md" title="Tambah Routing" no-close-on-esc no-close-on-backdrop ref="modal"
                    @show="resetModalAdd" @hidden="resetModal" @ok="handleOk" ok-title="Tambah" cancel-title="Kembali">
                    <form ref="form" class="row p-5" @submit.stop.prevent="handleSubmit">

                        <div class="col-md-6 mb-2">
                            <b-form-group label="Grup Routing" label-for="ItemName"
                                invalid-feedback="Grup Routing Harus Diisi!" :state="typeState">
                                <multiselect id="Condition" v-model="type" :options="filterGroup" placeholder="Select one"
                                    :multiple="false" :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Nama Routing" label-for="ItemName"
                                invalid-feedback="Nama Routing Harus Diisi!" :state="NameState">
                                <b-form-input id="ItemName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 d-none">
                            <b-form-group label="Page Routing" label-for="taxType"
                                invalid-feedback="Page Routing Harus Diisi!" :state="contactState">
                                <multiselect id="taxType" v-model="contact" :options="optionsPage"
                                    :custom-label="customLabel1" placeholder="Select one" :multiple="false"
                                    :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Eff. Date Routing" label-for="usahaTelp"
                                invalid-feedback="Eff. Date Routing Harus Diisi!" :state="descState">
                                <b-form-input type="date" id="usahaTelp" v-model="desc" :state="descState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mt-4">
                            <!-- tambah routing -->
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Routing Confirm</span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addAddress class="btn p-0" data-toggle="tooltip"
                                        title="Tambah Alamat">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showAddress" @click="showAddress = !showAddress" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showAddress = !showAddress" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showAddress" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col" class="text-center">User</th>
                                        <th scope="col" class="text-center">Condition</th>
                                        <th scope="col" class="text-center">More User</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(address, i) in optionAddress" :key="i">
                                        <td class="align-top">{{ address.no }}</td>
                                        <td class="align-top">{{ address.userLogic[0].userId.userName }}</td>
                                        <td class="align-top text-center">{{ address.logic }}</td>
                                        <td>
                                            <p class="m-0" v-for="(user, index) in address.userLogic" v-if="index > 0">
                                                - {{ user.userId.userName }}
                                            </p>
                                        </td>
                                        <td class="text-center">
                                            <button type="button" class="btn p-0"
                                                @click="editAddress(address, i, $event.target)">
                                                <i class="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button type="button" class="btn p-0" @click="removeAddress(i)">
                                                <i class="bi bi-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addMicro" size="lg" title="Tambah Microservice" no-close-on-esc no-close-on-backdrop
                    ref="modal" @show="resetModal" @hidden="resetModal" @ok="handleMicroOk" ok-title="Tambah"
                    cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleMicroSubmit">
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Nama Microservice" label-for="microName"
                                invalid-feedback="Nama Microservice Harus Diisi!" :state="NameState">
                                <b-form-input id="microName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Tipe Microservice" label-for="microType"
                                invalid-feedback="Tipe Microservice Harus Diisi!" :state="typeState">
                                <b-form-input id="microType" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Deskripsi Microservice" label-for="microDesc">
                                <b-form-input id="microDesc" v-model="desc"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="icon Microservice" label-for="microImage">
                                <b-form-input id="microImage" v-model="image"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Placeholder Microservice" label-for="microPleaceholder">
                                <b-form-input id="microPleaceholder" v-model="prov"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Routing Microservice" label-for="microRouting">
                                <b-form-input id="microRouting" v-model="kab"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="Navigasi Microservice" label-for="microNavigate">
                                <b-form-input id="microNavigate" v-model="kec"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h4 my-1" label="API Function Script" label-for="microAddress">
                                <b-form-input id="microAddress" v-model="address"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-3 mb-2">
                            <b-form-group class="h4 my-1" label="Kode Microservice" label-for="microData"
                                invalid-feedback="Kode Microservice Harus Diisi!" :state="descState">

                                <b-input-group :prepend="this.infoModal.content.appProcCode + '.'">
                                    <b-form-input id="microData" type="number" v-model="microCode" :state="descState"
                                        required></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </div>
                        <div class="col-md-9 mb-2">
                            <b-form-group class="h4 my-1" label="Data Microservice" label-for="microData">
                                <b-form-textarea id="microData" v-model="id"></b-form-textarea>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addProc" size="sm" title="Tambah Proses" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @show="resetModal" @hidden="resetProcDetail" @ok="handleOkProc"
                    ok-title="Tambah" cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitProc">
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nama Proses" label-for="ItemName" invalid-feedback="Nama Proc Harus Diisi!"
                                :state="NameState">
                                <b-form-input id="ItemName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Kode" label-for="ItemKode" invalid-feedback="Kode Harus Diisi!"
                                :state="descState">
                                <b-form-input id="ItemKode" v-model="id" :state="descState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Group App" label-for="ItemType" invalid-feedback="Group App Harus Diisi!"
                                :state="typeState">
                                <b-form-input id="ItemType" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Deskripsi" label-for="ItemDesc">
                                <b-form-input id="ItemDesc" v-model="desc"></b-form-input>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addAddress" size="sm" title="Tambah Routing Confirm" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkAddress">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitAddress">
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Nomor" label-for="nomor">
                                <b-form-input type="number" id="nomor" :value="optionAddress.length+1" disabled
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group label="Condition" label-for="usahaLokasi"
                                invalid-feedback="Condition Harus Diisi!" :state="kabState">
                                <multiselect @input="changeCondition" id="Condition" v-model="kab"
                                    :options="optionsCategory" placeholder="Select one" :multiple="false"
                                    :show-labels="false" :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="User" label-for="usahaLokasi" invalid-feedback="User Harus Diisi!"
                                :state="kecState">
                                <multiselect id="usahaLokasi" v-model="kec" :options="optionsUser" placeholder="Select one"
                                    :multiple="false" :show-labels="false" :custom-label="customLabel"
                                    :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div :class="kab === 'and' || kab === 'or' ? '' : 'd-none'"
                            class="d-flex justify-content-center w-100 my-2">
                            <div style="width: 90%; height: 16px; border-bottom: 1px solid black; text-align: center;">
                                <span style="font-size: 20px;background-color: #fff;padding: 0px 10px;"> More User
                                </span>
                            </div>
                        </div>
                        <div :class="kab === 'and' || kab === 'or' ? '' : 'd-none'" class="col-md-12 mt-4">
                            <b-form-group label="" label-for="usahaLocation" invalid-feedback="User Harus Diisi!"
                                :state="imageState">
                                <multiselect v-model="image" :options="optionsMoreUser" :multiple="true"
                                    :clear-on-select="false" :preserve-search="true" placeholder="Pick some"
                                    :custom-label="customLabel" track-by="_id">
                                    <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                            class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                values.length }} options selected</span></template>
                                </multiselect>
                                <pre>
User List :
<template v-for="data in image">- {{ data.userName }} ({{ data.userType }})
</template>
  </pre>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addContact" size="sm" title="Tambah Contact Person" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkContact">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitContact">
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nama Contact Person" label-for="contactName"
                                invalid-feedback="Nama Contact Person Harus Diisi!" :state="provState">
                                <b-form-input id="contactName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nomor Telepon" label-for="usahaTelp"
                                invalid-feedback="Nomor Telepon Harus Diisi!" :state="kabState">
                                <b-input-group prepend="+62">
                                    <b-form-input type="number" id="usahaTelp" v-model="kab" :state="kabState"
                                        required></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addPayment" size="sm" title="Tambah Payment Type" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkPayment">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitPayment">
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Tipe Pembayaran" label-for="paymentType"
                                invalid-feedback="Tipe Pembayaran Harus Diisi!" :state="provState">
                                <b-form-input id="paymentType" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nomor Pembayaran" label-for="usahaTelp"
                                invalid-feedback="Nomor Pembayaran Harus Diisi!" :state="kabState">
                                <b-form-input type="number" id="usahaTelp" v-model="kab" :state="kabState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nama" label-for="paymentName"
                                invalid-feedback="Nama Pembayaran Harus Diisi!" :state="kecState">
                                <b-form-input id="paymentName" v-model="kec" :state="kecState" required></b-form-input>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-row class="my-3">
                    <b-col sm="5" md="6" class="my-1">
                        <span class="px-2">Show</span>
                        <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions"
                            size="sm"></b-form-select>
                        Data of {{ totalRows }} Data
                    </b-col>
                    <b-col sm="7" md="6" class="my-1">
                        <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill"
                            size="sm" class="my-0"></b-pagination>
                    </b-col>
                </b-row>
            </div>
        </div>
    </main>
</template>
  
<script>

import { formatIndDate, formatStandartDate, getFullDate } from '../components/function/date'
import { getUser, getRouting, getRoutingGroup, addRouting, updateRouting } from '../components/services/components'
import { getUsaha, addProc, addMicro, updateProc, updateMicro } from "./services/usaha";
export default {
    data() {
        return {
            currentDate: '',
            optionsGroup: [],
            showAddress: true,
            showContact: true,
            showPayment: true,
            optionAddress: [],
            optionContact: [],
            optionPayment: [],
            addressIndex: '',
            contactIndex: '',
            paymentIndex: '',

            optionsCategory: ['and', 'or', 'next', 'end'],
            optionsPage: [],
            data: [],

            microData: true,
            microVariable: false,
            procFields: [
                { key: 'appProcCode', label: 'Kode' },
                { key: 'appGroupMenu', label: 'Group' },
                { key: 'appProcName', label: 'Nama' },
                { key: 'appProcDesc', label: 'Deskripsi' },
                { key: 'opsiProc', label: 'Opsi' }
            ],
            microFields: [
                { key: 'microCode', label: 'Kode' },
                { key: 'microName', label: 'Nama' },
                { key: 'microType', label: 'Tipe' },
                { key: 'microDescription', label: 'Deskripsi' },
                { key: 'opsiMicro', label: 'Opsi' }
            ],

            moreUser: [],
            dataId: '',
            procId: '',
            microId: '',
            dataIndex: '',
            procIndex: '',
            microIndex: '',
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, 25],
            fields: ['routingGroup', 'routingName', 'routingAppProcess', 'routingEfectiveDate', 'routingConfirm', 'opsi'],
            sorts: [],
            selected: ['routingGroup', 'routingName', 'routingAppProcess', 'routingEfectiveDate', 'routingConfirm', 'opsi'],
            Item: [],
            process: [],
            microservice: [],
            filter: '',
            infoModal: {
                id: 'info-modal',
                title: '',
                content: ''
            },
            editModal: {
                id: 'edit-modal',
                title: '',
                content: ''
            },
            editProc: {
                id: 'edit-modal-proc',
                title: '',
                content: ''
            },
            procModal: {
                id: 'proc-modal',
                title: '',
                content: ''
            },
            microModal: {
                id: 'micro-modal',
                title: '',
                content: ''
            },
            microVar: false,
            arrayVariable: [],
            options: [],
            microCode: '',
            code: '',
            id: '',
            name: '',
            type: '',
            desc: '',
            prov: '',
            kab: '',
            kec: '',
            address: '',
            image: '',
            contact: '',
            xFilEkey: null,

            contactState: null,
            NameState: null,
            typeState: null,
            descState: null,
            provState: null,
            kabState: null,
            kecState: null,
            addressState: null,
            imageState: null
        }
    },
    methods: {
        findUserRouting(id) {
            console.log(id)
            return this.data.find(x => x._id === id)
        },
        filterUserRouting(id) {
            const changeId = id.slice(1)
            const mergedArray = changeId.map(item1 => {
                const matchingItem = this.data.find(item2 => item2._id === item1.userId._id)
                return matchingItem ? { ...item1, ...matchingItem } : item1;
            })
            return mergedArray
        },
        changeCondition(newData) {
            if (newData === 'next' || newData === 'end') {
                this.image = []
            }
            // You can put your logic or method calls here
        },
        customLabel1(option) {
            return `${option.appProcName} (${option.appProcCode})`;
        },
        customLabel(option) {
            return `${option.userName} (${option.userType})`;
        },
        addCategory(newCat) {
            this.optionsCategory.push(newCat);
            this.contact = newCat;
        },
        editPhone(phone) {
            console.log(phone)
            if (phone.length > 0) {
                return phone.slice(1);
            } else {
                return phone
            }
        },
        removeAddress(index) {
            this.$swal({
                title: 'Hapus Address?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Data terhapus!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.optionAddress.splice(index, 1);
                }
            });
        },
        handleOkAddress(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitAddress()
        },
        handleSubmitAddress() {
            if (this.kab && this.kec) {
                const data = {
                    no: this.optionAddress.length+1,
                    logic: this.kab,
                    userLogic: [this.kec].map(x => ({ userId: { _id: x._id, userName: x.userName } }))
                }
                const tes = this.image.map(x => ({ userId: { _id: x._id, userName: x.userName } }))
                tes.forEach(item => {
                    data.userLogic.push(item)
                })
                console.log(data)
                this.optionAddress.push(data)
                this.$swal({
                    icon: 'success',
                    title: 'Address Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addAddress')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
            if (!this.kec) {
                this.kecState = false;
            } else {
                this.kecState = true;
            }
        },
        editAddress(item, index, button) {
            this.editProc.title = 'Edit Routing'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.addressIndex = index
            const addressContent = this.optionAddress[index]
            this.prov = addressContent.no
            this.kab = addressContent.logic
            this.kec = this.findUserRouting(addressContent.userLogic[0].userId._id)
            this.image = this.filterUserRouting(addressContent.userLogic)
        },
        saveEditAddress() {
            if (this.prov && this.kab && this.kec) {
                // const topp = this.optionAddress[this.addressIndex]
                // console.log(topp)
                console.log('kec',this.kec)
                console.log('image',this.image)
                const data = {
                    no: this.prov,
                    logic: this.kab,
                    userLogic: [this.kec].map(x => ({ userId: { _id: x._id, userName: x.userName } }))
                }
                const tes = this.image.map(x => ({ userId: { _id: x._id, userName: x.userName } }))
                tes.forEach(item => {
                    data.userLogic.push(item)
                })
                console.log(this.optionAddress)
                this.optionAddress[this.addressIndex] = data
                console.log(this.optionAddress)
                this.$swal({
                    icon: 'success',
                    title: 'Address Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-modal-proc')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
        },

        removeContact(index) {
            this.$swal({
                title: 'Hapus Contact?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Data terhapus!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.optionContact.splice(index, 1);
                }
            });
        },
        handleOkContact(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitContact()
        },
        handleSubmitContact() {
            if (this.prov && this.kab) {
                const data = {
                    nama: this.prov,
                    HP: '0' + this.kab,
                }
                this.optionContact.push(data)
                this.$swal({
                    icon: 'success',
                    title: 'Contact Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addContact')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
        },
        editContact(item, index, button) {
            this.editProc.title = 'Edit Contact'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.contactIndex = index
            const contactContent = this.optionContact[index]
            this.prov = contactContent.nama
            console.log(this.editPhone(contactContent.HP))
            this.kab = this.editPhone(contactContent.HP)
        },
        saveEditContact() {
            if (this.prov && this.kab) {
                const topp = this.optionContact[this.contactIndex]
                const data = {
                    nama: this.prov,
                    HP: '0' + this.kab,
                }
                this.optionContact[this.contactIndex] = data
                this.$swal({
                    icon: 'success',
                    title: 'Address Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-modal-proc')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
        },

        removePayment(index) {
            this.$swal({
                title: 'Hapus Payment Type?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Data terhapus!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.optionPayment.splice(index, 1);
                }
            });
        },
        handleOkPayment(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitPayment()
        },
        handleSubmitPayment() {
            if (this.prov && this.kab && this.kec) {
                const data = {
                    Type: this.prov,
                    Number: this.kab,
                    Name: this.kec,
                }
                this.optionPayment.push(data)
                this.$swal({
                    icon: 'success',
                    title: 'Payment Type Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addPayment')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
            if (!this.kec) {
                this.kecState = false;
            } else {
                this.kecState = true;
            }
        },
        editPayment(item, index, button) {
            this.editProc.title = 'Edit Contact'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.paymentIndex = index
            const paymentContent = this.optionPayment[index]
            this.prov = paymentContent.Type
            this.kab = paymentContent.Number
            this.kec = paymentContent.Name
        },
        saveEditPayment() {
            4
            if (this.prov && this.kab && this.kec) {
                const topp = this.optionPayment[this.contactIndex]
                const data = {
                    Type: this.prov,
                    Number: this.kab,
                    Name: this.kec,
                }
                this.optionPayment[this.paymentIndex] = data
                this.$swal({
                    icon: 'success',
                    title: 'Payment Type Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('edit-modal-proc')
                });
            }
            // add validation
            if (!this.prov) {
                this.provState = false;
            } else {
                this.provState = true;
            }
            if (!this.kab) {
                this.kabState = false;
            } else {
                this.kabState = true;
            }
            if (!this.kec) {
                this.kecState = false;
            } else {
                this.kecState = true;
            }
        },

        mainTable() {
            return 'd-flex'
        },
        handleJsonError(err) {
            console.error('JSON editor error:', err);
        },
        convertToJson() {
            try {
                const lines = this.id.trim().split('\n').replace('\"', '');
                lines.forEach((line) => {
                    const array = line.split(',');
                    this.parsedArrays.push(array);
                });
            } catch (error) {
                console.error(error)
            }
        },
        // getLogo(imageUrls) {
        //     Promise.all(
        //         imageUrls.map(url =>
        //             axios.get(url, {
        //                 responseType: 'blob' // Set the response type to arraybuffer to handle binary data
        //             }).then(responses => URL.createObjectURL(responses.data))
        //         )
        //     )
        //         .then(imageUrls => {
        //             this.listLogo = imageUrls.map(url => ({ icon: url }));
        //             this.Item = this.Item.map((item, index) => Object.assign({}, item, this.listLogo[index]))
        //         })
        // },
        async ItemTable() {
            const tes = await getRouting();
            this.Item = tes.map(x => ({ ...x, routingEfectiveDate: formatIndDate(x.routingEfectiveDate) }))
            console.log('cari data', this.Item)
            // await this.getLogo(imageUrls)
            this.totalRows = this.Item.length;
            const oldCurrentPage = this.currentPage;
            this.currentPage = 1;
            this.$nextTick(() => {
                this.currentPage = oldCurrentPage
            });
        },
        async procTable() {
            await this.ItemTable();
            this.procModal.content = this.Item.filter(dTemplate => dTemplate._id === this.dataId)[0];
            this.process = this.procModal.content.appProcess;
            this.$store.commit('setDataItem', this.process);
        },
        async microTable() {
            await this.procTable();
            this.microservice = this.process[this.procIndex].appProcMicroservices
            this.microModal.content = this.microservice
        },

        swalDel() {

        },
        successAdd() {
            this.$swal(
                'Berhasil!',
                'Data berhasil ditambahkan',
                'success'
            )
        },
        failedAdd() {
            this.$swal(
                'Gagal!',
                'Data gagal ditambahkan!',
                'cancel'
            )
        },
        successEdit() {
            this.$swal(
                'Berhasil!',
                'Data berhasil Diedit',
                'success'
            )
        },
        successDelete() {
            this.$swal(
                'Berhasil!',
                'Data berhasil Dihapus',
                'success'
            )
        },
        alertLoading() {
            this.$swal({
                title: 'Loading...',
                text: 'Mohon Ditunggu ya.',
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton: false,
                willOpen: () => {
                    this.$swal.showLoading();
                },
            });
        },
        alertAdd(typeData) {
            this.$swal({
                title: 'Anda Yakin?',
                text: "Tekan Tambah jika anda sudah yakin!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Tambah'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.alertLoading()
                    if (typeData === 'Item') {

                        const data = {
                            routingGroup: this.type,
                            routingName: this.name,
                            routingAppProcess: this.contact.appProcCode,
                            routingEfectiveDate: this.desc,
                            routingConfirm: this.optionAddress.map(x => {
                                const data = {
                                    ...x
                                }
                                data.userLogic = data.userLogic.map(x => ({ userId: x.userId._id, verif: 'no' }))
                                return data
                            })
                        }
                        try {
                            console.log(data)
                            await addRouting(data)
                            await this.ItemTable()
                            this.$bvModal.hide('modal-add')
                            this.successAdd()
                        } catch (error) {
                            alert(error)
                        }
                    } else if (typeData === 'proses') {
                        const id = this.dataId
                        const data = {
                            appProcCode: this.id,
                            appProcName: this.name,
                            appProcDesc: this.desc,
                            appGroupMenu: this.type,
                            appProcMicroservices: []
                        }
                        try {
                            await addProc(data, id)
                            await this.procTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('modal-addProc')
                        this.successAdd()
                    } else if (typeData === 'micro') {
                        if (this.id == '') {
                            alert(this.id, '" "')
                        }
                        try {
                            const microData = JSON.parse(this.id);

                        } catch (error) {

                        }
                        const link = this.dataId + '/' + this.procId
                        const data = {
                            microCode: this.infoModal.content.appProcCode + '.' + this.microCode,
                            microName: this.name,
                            microType: this.type,
                            microDescription: this.desc,
                            microIcon: this.image,
                            microData: JSON.parse(this.id),
                            microVariable: [],
                            microPleaceholder: this.prov,
                            microRouting: this.kab,
                            microNavigate: this.kec,
                            microAPIFunctionScript: this.address
                        }
                        try {
                            await addMicro(data, link)
                            await this.microTable()
                            this.$bvModal.hide('modal-addMicro')
                            this.successAdd()
                        } catch (error) {
                            alert(error)
                            this.failedAdd()
                        }
                    }

                }
            });
        },
        alertEdit(typeData) {
            this.$swal({
                title: 'Anda Yakin?',
                text: "Tekan Edit jika anda sudah yakin!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#00AB8E',
                confirmButtonText: 'Edit'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    this.alertLoading()
                    if (typeData === 'Item') {
                        const uId = this.id
                        const data = {
                            routingGroup: this.type,
                            routingName: this.name,
                            routingAppProcess: this.desc.appProcCode,
                            routingEfectiveDate: this.contact,
                            routingConfirm: this.optionAddress
                        }
                        try {
                            await updateRouting(data, uId);
                            // console.log(uId, data)
                            await this.ItemTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('edit-modal')
                        this.successEdit()
                    } else if (typeData === 'proses') {
                        const link = this.dataId + '/' + this.procId
                        const data = {
                            appProcCode: this.id,
                            appProcName: this.name,
                            appProcDesc: this.desc,
                            appGroupMenu: this.type,
                            appLinkMenu: this.prov,
                            appIconMenu: this.kab
                        }
                        try {
                            await updateProc(data, link);
                            await this.procTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('edit-modal-proc')
                        this.successEdit()

                    } else if (typeData === 'micro') {
                        const link = this.dataId + '/' + this.procId + '/' + this.microId
                        const microVar = this.microservice.find(x => x._id === this.microId).microVariable
                        if (this.arrayVariable === microVar) {
                            this.arrayVariable = JSON.stringify(this.arrayVariable)
                        }

                        const data = {
                            microCode: this.infoModal.content.appProcCode + '.' + this.microCode,
                            microName: this.name,
                            microType: this.type,
                            microDescription: this.desc,
                            microIcon: this.image,
                            microData: JSON.parse(this.id),
                            microVariable: JSON.parse(this.arrayVariable),
                            microPleaceholder: this.prov,
                            microRouting: this.kab,
                            microNavigate: this.kec,
                            microAPIFunctionScript: this.address
                        }
                        try {
                            await updateMicro(data, link)
                            await this.microTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('edit-modal-proc')
                        this.successEdit()

                    }

                }
            });
        },
        alertDelete(typeData, data) {

            this.$swal({
                title: 'Anda Yakin?',
                text: "Data yang dihapus tidak dapat dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonText: 'Kembali',
                confirmButtonText: 'Ya, Hapus Saja!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    if (typeData === 'Item') {
                        const row = data
                        const data = {

                        }
                        try {
                            await deleteTemplate(data._id);
                            await this.ItemTable();
                        } catch (error) {
                            alert(error)
                        }
                    } else if (typeData === 'proses') {
                        try {
                            await deleteProc(this.dataId + '/' + data._id);
                            await this.procTable();
                        } catch (error) {
                            alert(error)
                        }
                    } else if (typeData === 'micro') {
                        try {
                            await deleteMicro(this.dataId + '/' + this.procId + '/' + data._id);
                            await this.microTable();
                        } catch (error) {
                            alert(error)
                        }
                    }
                    this.successDelete()
                }
            });
        },

        resetAll() {
            this.code = ''
            this.id = ''
            this.name = ''
            this.type = ''
            this.desc = ''
            this.address = ''
            this.contact = ''
            this.addressIndex = ''
            this.contactIndex = ''
            this.paymentIndex = ''

            this.contactState = null
            this.NameState = null
            this.typeState = null
            this.descState = null
            this.addressState = null
            this.resetArray()
        },
        resetArray() {
            this.prov = ''
            this.kab = ''
            this.kec = ''
            this.image = ''
            this.moreUser = []

            this.imageState = null
            this.provState = null
            this.kabState = null
            this.kecState = null
        },
        resetModalAdd() {
            this.resetModal()
            this.desc = this.currentDate
        },
        resetModal() {
            this.microCode = ''
            this.resetAll()
            this.optionAddress = []
            this.optionContact = []
            this.optionPayment = []
        },
        onFiltered(filteredItems) {
            this.totalRows = filteredItems.length;
            this.currentPage = 1;
        },
        numberFormat(value) {
            this.zero = Number(value.replace(/\D/g, ''))
            return value == null ? '' : this.zero.toLocaleString();
        },
        previewFiles(event) {
            const file = event.target.files[0];
            this.xFilEkey = file;
            this.image = URL.createObjectURL(file);
        },
        // edit methods
        resetEditModal() {
            this.editModal.title = ''
            this.editModal.content = ''
            this.resetAll()
        },
        resetEditArray() {
            this.editProc.title = ''
            this.editProc.content = ''

            this.microId = ''
            this.microCode = ''
            this.microVar = false
            this.arrayVariable = []
            this.$bvModal.hide('edit-modal-proc')
            this.resetArray()
        },
        edit(Item, index, button) {
            this.editModal.title = `Edit Data: ${Item.routingName}`
            this.editModal.content = Item
            this.$root.$emit('bv::show::modal', this.editModal.id, button)

            this.id = this.editModal.content._id
            this.name = this.editModal.content.routingName
            this.type = this.editModal.content.routingGroup
            this.contact = formatStandartDate(this.editModal.content.routingEfectiveDate)
            this.desc = this.optionsPage.find(x => x.appProcCode === this.editModal.content.routingAppProcess)

            console.log(this.editModal.content.routingConfirm)
            this.editModal.content.routingConfirm.forEach(x => {
                this.optionAddress.push(x)
            })
        },
        handleEdit(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleEditSubmit()
        },
        handleEditSubmit() {
            // Exit when the form isn't valid
            if (this.name && this.desc && this.contact, this.type) {
                this.alertEdit('Item')
            }
            if (this.name == "") {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (this.desc == "") {
                this.descState = false;
            } else {
                this.descState = true;
            }
            if (this.address == "") {
                this.addressState = false;
            } else {
                this.addressState = true;
            }
            if (this.type == "") {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
            if (this.contact == "") {
                this.contactState = false;
            } else {
                this.contactState = true;
            }
        },

        infoMicro(Item, index) {
            this.microModal.content = this.microservice[index]
            this.microId = this.microModal.content._id
            this.microIndex = index
        },
        editMicroModal(item, index, button) {
            this.editProc.title = 'Edit Microservice'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.microCode = parseInt(item.microCode.replace(this.infoModal.content.appProcCode + '.', ' '))
            this.name = item.microName
            this.type = item.microType
            this.desc = item.microDescription
            this.image = item.microIcon
            this.id = JSON.stringify(item.microData, null, " ")
            this.prov = item.microPleaceholder
            this.kab = item.microRouting
            this.kec = item.microNavigate
            this.address = item.microAPIFunctionScript
            this.microId = item._id
            this.arrayVariable = item.microVariable
        },
        editMicroVar(item, index, button) {
            this.editMicroModal(item, index, button)
            this.editProc.title = 'Edit Variabel Microservice'
            this.microVar = true
        },
        addMicroservice() {
            this.$bvModal.show('modal-addMicro')
            this.id = '" "'
        },
        // add method proc
        proc(Item, index, button) {
            this.procModal.title = `Proses Dari: ${Item.userTax}`
            this.procModal.content = Item
            this.process = Item.appProcess
            this.$root.$emit('bv::show::modal', this.procModal.id, button)
            this.dataId = Item._id
            this.dataIndex = index

        },
        resetProcDetail() {
            this.resetAll()
            this.$bvModal.show('proc-modal')
        },

        addProcModal() {
            this.$bvModal.show('modal-addProc')
        },
        handleOkProc(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitProc()
        },
        handleSubmitProc() {
            if (this.name && this.type && this.desc) {
                this.alertAdd('proses')
            }
            // add validation
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.type) {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
            if (!this.desc) {
                this.descState = false;
            } else {
                this.descState = true;
            }
        },
        // Item Item
        item(item) {
            const sendData = {
                title: item.userTax,
                code: item._id
            }
            this.$router.push({
                name: 'item',
                params: {
                    itemDomain: sendData
                }
            });
        },
        // Info Proc
        infoProc(item, index, button) {
            this.infoModal.title = this.procModal.title
            this.infoModal.content = this.procModal.content.appProcess[index]
            this.microservice = this.infoModal.content.appProcMicroservices
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            this.procId = this.infoModal.content._id
            this.procIndex = index
        },
        // edit proc methods
        editProcModal(item, index, button) {
            this.editProc.title = this.procModal.title
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.procId = this.procModal.content.appProcess[index]._id
            this.procIndex = index
            this.id = item.appProcCode
            this.name = item.appProcName
            this.desc = item.appProcDesc
            this.type = item.appGroupMenu
            this.prov = item.appLinkMenu
            this.kab = item.appIconMenu
        },
        resetEditProc() {
            this.editProc.title = ''
            this.editProc.content = ''

            this.microId = ''
            this.microCode = ''
            this.microVar = false
            this.arrayVariable = []
            this.resetAll()
        },
        handleProcEdit() {
            // Exit when the form isn't valid
            if (this.name && this.id && this.type && this.prov) {
                this.alertEdit('proses')
            }
            if (this.name == "") {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (this.id == "") {
                this.descState = false;
            } else {
                this.descState = true;
            }
            if (this.type == "") {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
            if (this.prov == "") {
                this.provState = false;
            } else {
                this.provState = true;
            }
        },
        // add micro data 
        handleMicroOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleMicroSubmit()
        },
        handleMicroSubmit() {
            if (this.name && this.type && this.microCode) {
                this.alertAdd('micro')
            }
            // add validation
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.type) {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
            if (!this.microCode) {
                this.descState = false;
            } else {
                this.descState = true;
            }
        },
        handleMicroEdit() {
            if (this.name && this.type && this.microCode) {
                this.alertEdit('micro')
            }
            // add validation
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.type) {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
        },
        // add method info
        async info(Item, index, button) {
            this.infoModal.title = `Detail Data: ${Item.routingName}`
            this.infoModal.content = Item
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            this.dataId = ''
        },
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
            this.microservice = ''
            this.procId = ''
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        handleSubmit() {
            if (this.type && this.contact && this.desc && this.name) {
                this.alertAdd('Item')
            }
            // add validation
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.type) {
                this.typeState = false;
            } else {
                this.typeState = true;
            }
            if (!this.desc) {
                this.descState = false;
            } else {
                this.descState = true;
            }
            if (!this.contact) {
                this.contactState = false;
            } else {
                this.contactState = true;
            }
        },
    },
    computed: {
        filterGroup() {
            const tes = this.Item.map(x => x.routingGroup)
            return this.optionsGroup.filter(item => !tes.includes(item));
            // return tes
        },
        optionsUser() {
            let ids = []
            if (this.optionAddress.length > 0) {
            ids = this.optionAddress.flatMap(item => item.userLogic.map(user => user.userId._id));
            } 
            if (this.image) {
                const tes = this.image.map(x => x._id)
                // return this.data.filter(x => !tes.includes(x._id))
                return this.data.filter(x => !ids.includes(x._id)).filter(x => !tes.includes(x._id))
            } else {
                return this.data.filter(x => !ids.includes(x._id))
            }
        },
        optionsMoreUser() {
            let ids = []
            if (this.optionAddress.length > 0) {
            ids = this.optionAddress.flatMap(item => item.userLogic.map(user => user.userId._id));
            } 
            if (this.kec) {
                return this.data.filter(x => !ids.includes(x._id)).filter(x => x._id !== this.kec._id)
            } else {
                return this.data.filter(x => !ids.includes(x._id))
            }
        },
        activeFields() {
            this.sorts = this.fields.filter(name => this.selected.includes(name));
            return this.sorts.map(v => {
                var Item = {}
                Item['key'] = v
                Item['label'] = v
                Item['thStyle'] = "font-weight:600"
                Item['class'] = "align-top"
                if (v !== 'opsi') {
                    Item['sortable'] = true,
                        Item['thClass'] = "text-center"
                } else {
                    Item['fillterByFormatted'] = false,
                        Item['thStyle'] = "width:80px",
                        Item['thClass'] = "text-center"
                }
                if (v === 'icon') {
                    Item['sortable'] = false,
                        Item['thStyle'] = "width: 60px",
                        Item['class'] = "text-center"
                }
                if (v === 'routingGroup') {
                    Item['label'] = "Grup Routing"
                }
                if (v === 'routingName') {
                    Item['label'] = "Nama Routing"
                }
                if (v === 'routingAppProcess') {
                    Item['label'] = "Page Routing"
                }
                if (v === 'routingEfectiveDate') {
                    Item['label'] = "Eff. Date Routing"
                }
                if (v === 'routingConfirm') {
                    Item['label'] = "Konfirmator"
                }
                return Item
            });
        },

    },
    async mounted() {
        this.currentDate = await getFullDate()
        this.optionsGroup = await getRoutingGroup();
        const optJenis = [];
        this.options = optJenis.map(v => ({ value: v._id, text: v.templateName }));
        this.data = await getUser();
        this.ItemTable();
        const tes = await getUsaha()
        this.optionsPage = tes[0].appProcess

    }
}
</script>

<style>
.btn:has(input[value="opsi"]) {
    display: none;
}
</style>