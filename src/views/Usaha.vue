<template>
    <main id="content" role="main" class="main">
      <!-- Content -->
            <div class="row">
                <div class="col-4 d-flex align-items-end">
            <ul class="breadcrumb m-1 mt-0">
                <li>
                    <router-link to="/dashboard">
                        <a href="#"><i class="bi-house-door"></i></a>
                    </router-link>
                </li>
                <li>Setup Usaha</li>
            </ul>
        </div>
        <div class="col-4 text-center">
            <span class="h2">List Setup Usaha</span>
        </div>
        <hr class="mb-3 mt-1">
            </div>
      <div class="content container-fluid">
        <!-- Page Header -->
            <div class="card">
            <!-- Header -->
                <b-row>
                    <b-col class="d-flex align-items-center">
                        <b-input-group size="sm" class="mx-2">
                            <b-form-input
                            id="filter-input"
                            v-model="filter"
                            type="search"
                            pleaceholder="Type to Search"
                            ></b-form-input>

                            <b-input-group-append>
                            <b-button size="sm" :disabled="!filter" @click="filter = ''">Clear</b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-col>
                    <b-col class="d-flex justify-content-end align-items-center">
                        <!-- <b-button v-b-modal.modal-add variant="primary" size="sm"><i class="bi-plus-circle"></i></b-button> -->
                        <b-dropdown id="dropdown-right" right text="Filter Column" variant="dark" class="m-2" size="sm">    
                            <template #button-content>
                                <i class="bi-sliders"></i>
                            </template>
                            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="fields" name="flavour-1" buttons>
                            </b-form-checkbox-group>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <!-- Main Table -->
                <b-table
                    ref="tableUsaha"
                    label-sort-asc=""
                    label-sort-desc=""
                    label-sort-clear=""
                    :bordered="true"
                    stacked="md" 
                    :items="usaha" 
                    :fields="activeFields" 
                    :current-page="currentPage"
                    :per-page="perPage" 
                    :filter="filter"
                    tbody-tr-class="row-class"
                    @filtered="onFiltered"
                    v-if="selected.length > 0">>
                    <template #cell(opsi)="row" style="width: 100px">  
                        <div width="0px">
                            <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                                <template #button-content>
                                    <i class="bi-gear-fill"></i>
                                </template>
                                <b-dropdown-item href="#" @click="info(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#" @click="edit(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete('usaha')">Hapus</b-dropdown-item>
                                <div class="dropdown-divider"></div>
                                <b-dropdown-item href="#" @click="proc(row.item, row.index, $event.target)">Proses</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template #cell(domainContactPerson)="data">
                        <template v-for="contact in data.value">
                            <p class="m-0"><b>- {{ contact.nama }}:</b> {{ contact.HP }}</p>
                        </template>
                    </template>
                    <template #cell(domainTax_Bank)="data">
                        <template v-for="tax in data.value">
                            <p class="m-0"><b>- {{ tax.nama }}:</b> {{ tax.amount }} {{ tax.jenis }}</p>
                        </template>
                    </template>
                    
                </b-table>
                
                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" no-close-on-esc no-close-on-backdrop hide-header-close>
                    <div class="row" v-if="dataId !== '' && procId !== '' && microId ===''">
                        <div class="col-4 d-flex justify-content-between"><span>Kode</span>:</div>
                        <div class="col-8 ps-1">{{ infoModal.content.appProcCode }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Nama Proses</span>:</div>
                        <div class="col-8 ps-1">{{ infoModal.content.appProcName }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Deskripsi</span>:</div>
                        <div class="col-8 ps-1">{{ infoModal.content.appProcDesc }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Group App</span>:</div>
                        <div class="col-8 ps-1">{{ infoModal.content.appGroupMenu }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Tanggal Dibuat</span>:</div>
                        <div class="col-8 ps-1">{{ infoModal.content.appProcCreated }}</div>
                        <div class="col-12 d-flex justify-content-center">
                        </div>
                        <div class="row py-2 mt-2 border-top">
                            <div class="col-2"></div>
                            <div class="col-8 text-center"><h1>Microservice</h1></div>
                            <div class="col-2 d-flex justify-content-center align-items-center">
                        </div>
                        </div>
                        <b-table ref="tableMicro" :fields="microFields" :items="microservice" hover modal-scrollable  class="table-bordered">
                            <template #cell(opsiMicro)="row">  
                        <div width="0px">
                            <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                                <template #button-content>
                                    <i class="bi-gear-fill"></i>
                                </template>
                                <b-dropdown-item href="#" @click="infoMicro(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#" @click="editMicroModal(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item href="#" @click="editMicroVar(row.item, row.index, $event.target)">Edit Variabel</b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete">Hapus</b-dropdown-item>
                            </b-dropdown>
                        </div>
                            </template>
                        </b-table>
                    </div>                    
                    <div class="row" v-else-if="dataId !== '' && procId !== '' && microId !==''">
                        <h4>Detail Microservice</h4>
                        <div class="col-4 d-flex justify-content-between"><span>Kode</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microCode }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Nama Microservise</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microName }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Tipe</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microType }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Deskripsi</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microDescription }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Placeholder</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microPleaceholder }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Icon</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microIcon }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Navigate</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microNavigate }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>Routing</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microRouting }}</div>
                        <div class="col-4 d-flex justify-content-between"><span>API Function Script</span>:</div>
                        <div class="col-8 ps-1">{{ microModal.content.microAPIFunctionScript }}</div>
                        <div class="col-12 d-flex flex-wrap justify-content-between my-4 shadow p-3 bg-white rounded">
                            <h4 class="d-flex align-items-center m-0">Data Microservice</h4>
                            <button type="button " class="btn btn-xs btn-outline-secondary" @click="microData = !microData">
                                <i v-if="microData" class="bi-chevron-down"></i>
                                <i v-else class="bi-chevron-up"></i>
                            </button>
                            <pre v-if="microData" class="w-100 mt-2 mb-0">{{ JSON.stringify(microModal.content.microData, null, " ") }}
                            </pre>
                        </div>
                        <div class="col-12 d-flex flex-wrap justify-content-between shadow p-3 bg-white rounded">
                            <h4 class="d-flex align-items-center m-0">Variabel Microservice</h4>
                            <button type="button " class="btn btn-xs btn-outline-secondary" @click="microVariable = !microVariable">
                                <i v-if="microVariable" class="bi-chevron-down"></i>
                                <i v-else class="bi-chevron-up"></i>
                            </button>
                            <pre v-if="microVariable" class="w-100 mt-2 mb-0">{{ JSON.stringify(microModal.content.microVariable, null, " ") }}
                            </pre>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="row col-lg-4">
                            <label class="avatar avatar-xxl overflow-hidden d-flex justify-content-center" for="editAvatarUploaderModal">
                                <img :src="infoModal.content.domainLogo" alt="icon">
                            </label>
                        </div>
                        <div class="row col-lg-8">
                        <div class="col-5 d-flex justify-content-between"><span>ID</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content._id }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Nama Usaha</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.domainName }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Deskripsi</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.domainDesc }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Lokasi</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.domainLocation }}</div>
                        <div class="col-5 d-flex justify-content-between"><span>Tanggal Dibuat</span>:</div>
                        <div class="col-7 ps-1">{{ infoModal.content.domainCreated }}</div>
                    </div>
                    </div>
                  <template #modal-footer>
                      <div v-if="dataId !== '' && procId !== '' && microId !==''" class="w-100 d-flex justify-content-end">
                          <b-button
                              variant="secondary"
                              size="sm"
                              @click="microId = ''"
                          >
                              Kembali
                          </b-button>
                      </div>
                      <div v-else-if="dataId !== '' && procId !== '' && microId ==''" class="w-100 d-flex justify-content-end">
                          <b-button
                          class="me-2"
                              variant="secondary"
                              size="sm"
                              @click="$bvModal.hide('info-modal')"
                          >
                              Kembali
                          </b-button>
                          <b-button size="sm" variant="primary" @click="addMicroservice">Tambah Micro</b-button>
                      </div>
                      <div v-else class="w-100 d-flex justify-content-end">
                          <b-button
                          class="me-2"
                              variant="secondary"
                              size="sm"
                              @click="$bvModal.hide('info-modal')"
                          >
                              Kembali
                          </b-button>
                      </div>
                  </template>
                </b-modal>
                <b-modal :id="procModal.id" :title="procModal.title"
                stacked
                @ok="addProcModal"
                ok-title="Tambah Proses" 
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
                                <b-dropdown-item href="#" @click="infoProc(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#" @click="editProcModal(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete">Hapus</b-dropdown-item>
                            </b-dropdown>
                        </div>
                            </template>
                            {{ process }}
                        </b-table>
                    </div>
                </b-modal>
                
                <b-modal :id="editModal.id" :title="editModal.title" @hidden="resetEditModal"
                    @ok="handleEdit" ok-variant="success" ok-title="Edit" cancel-title="Kembali">
                    
                    <form ref="form" class="row" @submit.stop.prevent="handleEditSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Nama Usaha
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                                label-for="usahaName"
                                invalid-feedback="Nama Usaha Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="usahaName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Deskripsi
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                            label-for="usahaDesc"
                            invalid-feedback="Deskripsi Harus Diisi!"
                            :state="descState"
                            >
                            <b-form-input
                                id="usahaDesc"
                                v-model="desc"
                                :state="descState"
                                required
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Alamat
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">                                
                            <b-form-group
                            label-for="address"
                            invalid-feedback="Alamat Harus Diisi!"
                            :state="addressState"
                            >
                            <b-form-input
                                id="address"
                                v-model="address"
                                :state="addressState"
                                required
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-md-12 mt-4">
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Contact Person</span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addContact class="btn p-0" data-toggle="tooltip"
                                        title="Tambah Contact Person">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showContact" @click="showContact = !showContact" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showContact = !showContact" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showContact" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th class="text-center" scope="col">No. Telp</th>
                                        <th class="text-center" scope="col">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(contact, i) in optionContact" :key="i">
                                        <td>{{ contact.nama }}</td>
                                        <td class="text-center">{{ contact.HP }}</td>
                                        <td class="text-center">
                                            <button type="button" class="btn p-0"
                                                @click="editContact(contact, i, $event.target)">
                                                <i class="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button type="button" class="btn p-0" @click="removeContact(i)">
                                                <i class="bi bi-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-12 mt-4">
                            <div class="px-2 bg-dark d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Tax (Pajak)</span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addTax class="btn p-0" data-toggle="tooltip"
                                        title="Tambah Contact Person">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showTax" @click="showTax = !showTax" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showTax = !showTax" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showTax" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">Nama</th>
                                        <th scope="col" class="text-center">Jenis</th>
                                        <th scope="col">Nominal</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(tax, i) in optionTax" :key="i">
                                        <td>{{ tax.nama }}</td>
                                        <td class="text-center">{{ tax.jenis }}</td>
                                        <td class="">{{ tax.amount }}</td>
                                        <td class="text-center">
                                            <button type="button" class="btn p-0"
                                                @click="editTax(tax, i, $event.target)">
                                                <i class="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button type="button" class="btn p-0" @click="removeTax(i)">
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
                    <form v-if="contactIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
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
                    <form v-else-if="taxIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Nama
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Jenis Pajak
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="paymentNumber" invalid-feedback="Nomor Pembayaran Harus Diisi!" :state="provState">
                                <multiselect 
                                    id="taxType"
                                    v-model="kab" 
                                    :options="optionsCategory" 
                                    placeholder="Select one" 
                                    :taggable="true"
                                    @tag="addCategory"
                                    :multiple="false"
                                    track-by="index" 
                                    :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <span class="m-0">
                                Nominal
                            </span>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="paymentName" invalid-feedback="Nama Pembayaran Harus Diisi!" :state="kecState">
                                <b-form-input id="paymentName" v-model="kec" :state="kecState" required></b-form-input>
                            </b-form-group>
                        </div>
                    </form>              
                    <form ref="form" @submit.stop.prevent="handleMicroEdit" v-else-if="dataId !== '' && procId !== '' && microId !==''">
                        <div v-if="!microVar" class="row">                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Nama
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                    label-for="procName"
                                    invalid-feedback="Nama Microservice Harus Diisi!"
                                    :state="NameState"
                                    >
                                    <b-form-input
                                        id="procName"
                                        v-model="name"
                                        :state="NameState"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Kode
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="procMicroCode"
                                invalid-feedback="Kode Microservice Harus Diisi!"
                                :state="descState"
                                >
                                <b-input-group :prepend="this.infoModal.content.appProcCode+'.'">
                                    <b-form-input
                                        id="procMicroCode"
                                        type="number"
                                        v-model="microCode"
                                        :state="descState"
                                        required
                                    ></b-form-input>
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
                                <b-form-group
                                    label-for="microType"
                                    invalid-feedback="Tipe Microservice Harus Diisi!"
                                    :state="typeState"
                                    >
                                    <b-form-input
                                        id="microType"
                                        v-model="type"
                                        :state="typeState"
                                        required
                                    ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Deskripsi
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="procDesc"
                                >
                                <b-form-input
                                    id="procDesc"
                                    v-model="desc"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Icon
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microIcon"
                                >
                                <b-form-input
                                    id="microIcon"
                                    v-model="image"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Placeholder
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microPleaceholder"
                                >
                                <b-form-input
                                    id="microPleaceholder"
                                    v-model="prov"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Routing
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microRouting"
                                >
                                <b-form-input
                                    id="microRouting"
                                    v-model="kab"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    Navigate
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microNaviagate"
                                >
                                <b-form-input
                                    id="microNaviagate"
                                    v-model="kec"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            
                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h4 class="m-0">
                                    API Function Script
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microFunctionScript"
                                >
                                <b-form-input
                                    id="microFunctionScript"
                                    v-model="prov"
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-4 d-flex pt-3 justify-content-between">
                                <h4 class="m-0">
                                    Data
                                </h4>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group
                                label-for="microId"
                                >
                                <b-form-textarea
                                    id="microId"
                                    v-model="id"
                                ></b-form-textarea>
                                </b-form-group>
                            </div>
                        </div>
                        

                        <JsonEditorVue v-else
                        style="height: 350px;"
                        v-model="arrayVariable"
                        Mode="text"
                        :options="{
                            Mode: 'text',
                            Modes: ['text'],
                            onError: handleJsonError,
                        }"
                        ></JsonEditorVue>
                    </form>                   
                    <form ref="form" class="row" @submit.stop.prevent="handleProcEdit" v-else>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Nama Proses*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                                label-for="procName"
                                invalid-feedback="Nama Proses Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="procName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Kode*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                                label-for="procCode"
                                invalid-feedback="Kode Harus Diisi!"
                                :state="descState"
                                >
                                <b-form-input
                                    id="procCode"
                                    v-model="id"
                                    :state="descState"
                                    required
                                ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Group App*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                            label-for="procGroup"
                            invalid-feedback="Group App Harus Diisi!"
                            :state="typeState"
                            >
                            <b-form-input
                                id="procGroup"
                                v-model="type"
                                :state="typeState"
                                required
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Deskripsi
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                            label-for="procDesc"
                            >
                            <b-form-input
                                id="procDesc"
                                v-model="desc"
                            ></b-form-input>
                            </b-form-group>
                        </div>
                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Routing*
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                                label-for="procRouting"
                                invalid-feedback="Routing Harus Diisi!"
                                :state="provState"
                                >
                                <b-form-input
                                    id="procRouting"
                                    v-model="prov"
                                    :state="provState"
                                    required
                                ></b-form-input>
                            </b-form-group>
                        </div>                        
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h4 class="m-0">
                                Icon
                            </h4>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group
                            label-for="procIcon"
                            >
                            <b-form-input
                                id="procIcon"
                                v-model="kab"
                            ></b-form-input>
                            </b-form-group>
                        </div>

                    </form>
                    <template #modal-footer v-if="contactIndex !== ''">
                        <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                        <b-button variant="success" @click="saveEditContact">Edit</b-button>
                    </template>
                    <template #modal-footer v-else-if="taxIndex !== ''">
                        <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                        <b-button variant="success" @click="saveEditTax">Edit</b-button>
                    </template>
                <template #modal-footer  v-else-if="dataId !== '' && procId !== '' && microId !==''">
                    <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                    <b-button variant="success"  @click="handleMicroEdit">Edit</b-button>
                </template>
                <template #modal-footer v-else>
                    <b-button variant="secondary" @click="resetEditArray">Kembali</b-button>
                    <b-button variant="success" @click="handleProcEdit">Edit</b-button>
                </template>
                </b-modal>
                <b-modal id="modal-add" size="lg" title="Tambah Usaha" 
                    no-close-on-esc
                    no-close-on-backdrop
                    ref="modal"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleOk"
                    ok-title="Tambah"
                    cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmit">
                        <div class="col-md-3 d-flex justify-content-center">
                            <div class=" d-flex justify-content-center align-items-center flex-wrap">
                                <b-form-group class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar bg-transparent d-flex align-items-end"
                                label-for="img1"
                                invalid-feedback="Tambah gambar dulu!" 
                                @change="(event) => previewFiles(event)"
                                tabindex="-1"
                                :state="imageState"
                                style="border:none"
                                >
                                
                            <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar" for="addImage" 
                            @change="(event) => previewFiles(event)"
                            tabindex="-1"
                            invalid-feedback="Provinsi Harus Diisi!"
                            :state="imageState"
                            style="margin: 0">
                                <img v-if="image !== ''" id="editAvatarImgModal" class="avatar-img" :src="image" alt="Image Description" />
                                <img v-else id="editAvatarImgModal" class="avatar-img" src="assets/img/160x160/img1.jpg" alt="Image Description">
                                <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input" id="addImage" :state="imageState" required>
                                <span class="avatar-uploader-trigger">
                                <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                </span>
                            </label>
                                <b-form-input
                                    tabindex="-1"
                                    id="img1" class="js-file-attach avatar-uploader-input"
                                    v-model="image"
                                    :state="imageState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="col-9 row m-0 p-0">
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                label="Nama Usaha"
                                label-for="usahaName"
                                invalid-feedback="Nama Usaha Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="usahaName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                label="Jenis Usaha (Tidak Bisa Dirubah)"
                                label-for="usahaType"
                                invalid-feedback="Nama Depan Harus Diisi!"
                                :state="typeState"
                                >
                                <b-form-select 
                                id="usahaType"
                                class="form-control"
                                v-model="type" 
                                :options="options"
                                :state="typeState"
                                required
                                >
                                </b-form-select>
                                </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Deskripsi"
                                label-for="usahaDesc"
                                invalid-feedback="Deskripsi Harus Diisi!"
                                :state="descState"
                                >
                                <b-form-input
                                    id="usahaDesc"
                                    v-model="desc"
                                    :state="descState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                            <div class="col-md-4 mb-2">
                                <b-form-group
                                label="Provinsi"
                                label-for="provinsi"
                                invalid-feedback="Provinsi Harus Diisi!"
                                :state="provState"
                                >
                                <b-form-input
                                    
                                    id="provinsi"
                                    v-model="prov"
                                    :state="provState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-4">
                                <b-form-group
                                label="Kabupaten"
                                label-for="Kabupaten"
                                invalid-feedback="Kabupaten Harus Diisi!"
                                :state="kabState"
                                >
                                <b-form-input
                                    id="Kabupaten"
                                    v-model="kab"
                                    :state="kabState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-4">
                                <b-form-group
                                label="Kecamatan"
                                label-for="kecamatan"
                                invalid-feedback="Kecamatan Harus Diisi!"
                                :state="kecState"
                                >
                                <b-form-input
                                    id="kecamatan"
                                    v-model="kec"
                                    :state="kecState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-12">
                                <b-form-group
                                label="Alamat"
                                label-for="address"
                                invalid-feedback="Alamat Harus Diisi!"
                                :state="addressState"
                                >
                                <b-form-input
                                    id="address"
                                    v-model="address"
                                    :state="addressState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addMicro" size="lg" title="Tambah Microservice" 
                    no-close-on-esc
                    no-close-on-backdrop
                    ref="modal"
                    @show="resetModal"
                    @hidden="resetModal"
                    @ok="handleMicroOk"
                    ok-title="Tambah"
                    cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleMicroSubmit">
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Nama Microservice"
                                label-for="microName"
                                invalid-feedback="Nama Microservice Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="microName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Tipe Microservice"
                                label-for="microType"
                                invalid-feedback="Tipe Microservice Harus Diisi!"
                                :state="typeState"
                                >
                                <b-form-input
                                    id="microType"
                                    v-model="type"
                                    :state="typeState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Deskripsi Microservice"
                                label-for="microDesc"
                                >
                                <b-form-input
                                    id="microDesc"
                                    v-model="desc"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="icon Microservice"
                                label-for="microImage"
                                >
                                <b-form-input
                                    id="microImage"
                                    v-model="image"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Placeholder Microservice"
                                label-for="microPleaceholder"
                                >
                                <b-form-input
                                    id="microPleaceholder"
                                    v-model="prov"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Routing Microservice"
                                label-for="microRouting"
                                >
                                <b-form-input
                                    id="microRouting"
                                    v-model="kab"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Navigasi Microservice"
                                label-for="microNavigate"
                                >
                                <b-form-input
                                    id="microNavigate"
                                    v-model="kec"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="API Function Script"
                                label-for="microAddress"
                                >
                                <b-form-input
                                    id="microAddress"
                                    v-model="address"
                                ></b-form-input>
                                </b-form-group>
                        </div>
                        <div class="col-md-3 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Kode Microservice"
                                label-for="microData"
                                invalid-feedback="Kode Microservice Harus Diisi!"
                                :state="descState"
                                >
                                
                            <b-input-group :prepend="this.infoModal.content.appProcCode+'.'">
                                <b-form-input
                                    id="microData"
                                    type="number"
                                    v-model="microCode"
                                    :state="descState"
                                    required
                                ></b-form-input>
                            </b-input-group>
                                </b-form-group>
                        </div>
                        <div class="col-md-9 mb-2">
                                <b-form-group
                                class="h4 my-1"
                                label="Data Microservice"
                                label-for="microData"
                                >
                                <b-form-textarea
                                    id="microData"
                                    v-model="id"
                                ></b-form-textarea>
                                </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <b-modal id="modal-addProc" size="sm" title="Tambah Proses" 
                    hide-header-close
                    no-close-on-esc
                    no-close-on-backdrop
                    ref="modal"
                    @show="resetModal"
                    @hidden="resetProcDetail"
                    @ok="handleOkProc"
                    ok-title="Tambah"
                    cancel-title="Kembali">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitProc">
                            <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Nama Proses"
                                label-for="usahaName"
                                invalid-feedback="Nama Proc Harus Diisi!"
                                :state="NameState"
                                >
                                <b-form-input
                                    id="usahaName"
                                    v-model="name"
                                    :state="NameState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Kode"
                                label-for="usahaKode"
                                invalid-feedback="Kode Harus Diisi!"
                                :state="descState"
                                >
                                <b-form-input
                                    id="usahaKode"
                                    v-model="id"
                                    :state="descState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Group App"
                                label-for="usahaType"
                                invalid-feedback="Group App Harus Diisi!"
                                :state="typeState"
                                >
                                <b-form-input
                                    id="usahaType"
                                    v-model="type"
                                    :state="typeState"
                                    required
                                ></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-12 mb-2">
                                <b-form-group
                                label="Deskripsi"
                                label-for="usahaDesc"
                                >
                                <b-form-input
                                    id="usahaDesc"
                                    v-model="desc"
                                ></b-form-input>
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
                <b-modal id="modal-addTax" size="sm" title="Tambah Tax (pajak)" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkTax">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitTax">
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nama" label-for="taxType"
                                invalid-feedback="Nama Pajak Harus Diisi!" :state="provState">
                                <b-form-input id="taxType" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Jenis Pajak" label-for="taxType"
                                invalid-feedback="Jenis Pajak Harus Diisi!" :state="kabState">
                                <multiselect 
                                    id="taxType"
                                    v-model="kab" 
                                    :options="optionsCategory" 
                                    placeholder="Select one" 
                                    :taggable="true"
                                    @tag="addCategory"
                                    :multiple="false"
                                    track-by="index" 
                                    :allow-empty="required">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nominal" label-for="paymentName"
                                invalid-feedback="Nominal Tidak Boleh Kosong!" :state="kecState">
                                <b-form-input id="taxAmount" v-model="kec" :state="kecState" required></b-form-input>
                            </b-form-group>
                        </div>
                    </form>
                </b-modal>
                <!-- <b-row class="my-3">
                <b-col sm="5" md="6" class="my-1">
                        <span class="px-2">Show</span> 
                    <b-form-select
                        id="per-page-select"
                        v-model="perPage"
                        :options="pageOptions"
                        size="sm"
                    ></b-form-select>
                    Data of {{ totalRows }} Data
                </b-col>
                <b-col sm="7" md="6" class="my-1">
                    <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    align="fill"
                    size="sm"
                    class="my-0"
                    ></b-pagination>
                </b-col>
                </b-row> -->
            </div>
        </div>
    </main>
  </template>
  
  <script>

import axios from "axios";
  import { getUsaha, addUsaha, addProc, addMicro, updateUsaha, updateProc, updateMicro } from "./services/usaha";
    export default {
        data(){
    return {
            showContact: true,
            optionContact: [],
            contactIndex: '',
            showTax: true,
            optionTax: [],
            taxIndex: '',

            optionsCategory: [ '%', 'Rp', '$'],
        microData: true,
        microVariable: false,
        procFields: [
            {key: 'appProcCode', label: 'Kode'},
            {key: 'appGroupMenu', label: 'Group'},
            {key: 'appProcName', label: 'Nama'},
            {key: 'appProcDesc', label: 'Deskripsi'},
            {key: 'opsiProc', label: 'Opsi'}
        ],
        microFields: [
            {key: 'microCode', label: 'Kode'},
            {key: 'microName', label: 'Nama'},
            {key: 'microType', label: 'Tipe'},
            {key: 'microDescription', label: 'Deskripsi'},
            {key: 'opsiMicro', label: 'Opsi'}
        ],

        listLogo: [],
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
        fields: ['domainName', 'domainDesc', 'domainLocation', 'domainContactPerson', 'domainTax_Bank', 'opsi'],
        sorts: [],
        selected: ['domainName', 'domainDesc', 'domainLocation', 'domainContactPerson', 'domainTax_Bank', 'opsi'],
        usaha: [],
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
        id: '',
        name: '',
        type: '',
        desc: '',
        prov: '',
        kab: '',
        kec: '',
        address: '',
        image: '',
        xFilEkey: null,
        
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
    addCategory(newCat) {
        const cat = {
            name: newCat
        };
        this.optionsCategory.push(cat);
        this.kab = cat;
    },
        editPhone(phone) {
            console.log(phone)
            if (phone.length > 0) {
                return phone.slice(1);
            } else {
                return phone
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
                    HP: '0'+this.kab,
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
                    HP: '0'+this.kab,
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

        removeTax(index) {
            this.$swal({
                title: 'Hapus Tax (pajak)?',
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
        handleOkTax(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitTax()
        },
        handleSubmitTax() {
            if (this.prov && this.kab && this.kec) {
                const data = {
                    nama: this.prov,
                    jenis: this.kab,
                    amount: this.kec,
                }
                this.optionTax.push(data)
                this.$swal({
                    icon: 'success',
                    title: 'Tax (pajak) Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addTax')
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
        editTax(item, index, button) {
            this.editProc.title = 'Edit Tax (Pajak)'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.taxIndex = index
            const taxContent = this.optionTax[index]
            this.prov = taxContent.nama
            this.kab = taxContent.jenis
            this.kec = taxContent.amount
        },
        saveEditTax() {
            if (this.prov && this.kab && this.kec) {
                const topp = this.optionTax[this.contactIndex]
                const data = {
                    nama: this.prov,
                    jenis: this.kab.nama,
                    amount: this.kec,
                }
                this.optionTax[this.paymentIndex] = data
                this.$swal({
                    icon: 'success',
                    title: 'Tax (pajak) Diedit!',
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
        } catch(error) {
            console.error(error)
        }
    },      
    getLogo(imageUrls) {
    Promise.all(
        imageUrls.map(url =>
          axios.get(url, {
            responseType: 'blob' // Set the response type to arraybuffer to handle binary data
          }).then(responses => URL.createObjectURL(responses.data))
        )
      )
        .then(imageUrls => {
            this.listLogo = imageUrls.map(url =>({icon: url}));
            this.usaha = this.usaha.map((item, index) => Object.assign({}, item, this.listLogo[index]) )
        })
    },
    async usahaTable() {
        this.usaha = await getUsaha();
        console.log(this.usaha)
        const imageUrls = this.usaha.map(logo => logo.domainLogo);
        // await this.getLogo(imageUrls)
        this.totalRows = this.usaha.length;
        const oldCurrentPage = this.currentPage;
        this.currentPage = 1;
        this.$nextTick(() => {
            this.currentPage = oldCurrentPage
        });
    },
  async procTable() {
    await this.usahaTable();
        this.procModal.content = this.usaha.filter(dTemplate => dTemplate._id === this.dataId)[0];
        this.process = this.procModal.content.appProcess;
        this.$store.commit('setDataUsaha', this.process);
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
          if (typeData === 'usaha') {
                const domainTypeStore = this.options.find(item => item.value === this.type).text
                const data = {
                    domainName: this.name,
                    domainDesc: this.desc,
                    domainType: this.type,
                    domainTypeStore: domainTypeStore,
                    domainLocation: this.prov + ', ' +  this.kab + ', ' + this.kec + ', ' + this.address,
                    xFilEkey: this.xFilEkey 
                }
              try {
              await addUsaha(data)
              await this.usahaTable()
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

              } catch(error) {
                
              }
              const link = this.dataId + '/' + this.procId
              const data = {
                  microCode: this.infoModal.content.appProcCode+'.'+this.microCode,
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
          if (typeData === 'usaha') {
              const uId = this.id
                const data = {
                    domainName: this.name,
                    domainDesc: this.desc,
                    domainLocation: this.address,
                    domainContactPerson: this.optionContact,
                    domainTax_Bank: this.optionTax
                }
              try {
                console.log(data)
                await updateUsaha(data, uId);
                await this.usahaTable()
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
                  microCode: this.infoModal.content.appProcCode+'.'+this.microCode,
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
        
      if (typeData === 'usaha') {
          try {
              await deleteTemplate(data._id);
              await this.usahaTable();
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
        this.id = ''
        this.name = ''
        this.type = ''
        this.desc = ''
        this.address = ''
        this.image = ''
        
        this.NameState = null
        this.typeState = null
        this.descState = null
        this.addressState = null
        this.imageState = null
        this.resetArray()
      },
        resetArray() {
            this.prov = ''
            this.kab = ''
            this.kec = ''
            this.contactIndex = ''
            this.contactTax = ''

            this.provState = null
            this.kabState = null
            this.kecState = null
        },
      resetModal() {
        this.microCode = ''
        this.resetAll()
        this.optionContact = []
        this.optionTax = []
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
        this.optionContact = []
        this.optionTax = []
    },
    edit(usaha, index, button) {
        this.editModal.title = `Edit Data: ${usaha.domainName}`
        this.editModal.content = usaha
        this.$root.$emit('bv::show::modal', this.editModal.id, button)
        
        this.id = this.editModal.content._id
        this.name = this.editModal.content.domainName
        this.desc = this.editModal.content.domainDesc
        this.address = this.editModal.content.domainLocation
        this.optionContact = JSON.parse(JSON.stringify(this.editModal.content.domainContactPerson))
        this.optionTax = JSON.parse(JSON.stringify(this.editModal.content.domainTax_Bank))
    },
      handleEdit(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleEditSubmit()
      },
      handleEditSubmit() {
        // Exit when the form isn't valid
        if (this.name && this.desc && this.address) {
            this.alertEdit('usaha')
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
      },
      
    infoMicro(usaha, index) {
        this.microModal.content = this.microservice[index]
        this.microId = this.microModal.content._id
        this.microIndex = index
    },
    editMicroModal(item, index, button) {
        this.editProc.title = 'Edit Microservice'
        this.$root.$emit('bv::show::modal', this.editProc.id, button)
        this.microCode = parseInt(item.microCode.replace(this.infoModal.content.appProcCode+'.',' '))
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
    proc(usaha, index, button) {
        this.procModal.title = `Proses Dari: ${usaha.domainName}`
        this.procModal.content = usaha
        this.process = usaha.appProcess
        this.$root.$emit('bv::show::modal', this.procModal.id, button)
        this.dataId = usaha._id
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
    async info(usaha, index, button) {
        this.infoModal.title = `Detail Data: ${usaha.domainName}`
        this.infoModal.content = usaha
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
        if (this.name && this.type && this.desc && this.prov && this.kab && this.kec && this.address && this.image) {
            this.alertAdd('usaha')
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
        if (!this.address) {
            this.addressState = false;
        } else {
            this.addressState = true;
        }
        if (!this.image) {
            this.imageState = false;
        } else {
            this.imageState = true;
        }
      },
  },
  computed: {
    activeFields(){
      this.sorts = this.fields.filter(name => this.selected.includes(name));
     return this.sorts.map(v => {
        var usaha = {}
        usaha['key']= v
        usaha['label']= v
        usaha['thStyle']= "font-weight:600"
        usaha['class']= "align-top"
        if(v !== 'opsi') {
            usaha['sortable']= true
        usaha['thStyle']= "font-weight:600"
        } else {
            usaha['fillterByFormatted']= false,
            usaha['thStyle']= "width:80px; font-weight:600",
            usaha['class']= "text-center"
        }
        if(v === 'icon') {
            usaha['sortable']=false,
            usaha['thStyle']= "width: 60px;",
            usaha['class']= "text-center"
        }
        if(v === 'domainName') {
            usaha['label']="Nama Usaha"
        }
        if(v === 'domainDesc') {
            usaha['label']="Deskripsi"
        }
        if(v === 'domainLocation') {
            usaha['label']="Lokasi"
        }
        if(v === 'domainContactPerson') {
            usaha['label']="Contact Person"
        }
        if(v === 'domainTax_Bank') {
            usaha['label']="Pajak"
        }
        return usaha
     });
    },

  },
  async mounted() {
    this.$store.commit('setBtnList', [])
    this.$store.commit('setTopbarTitle', "Data Customer");
    // const optJenis = await getOptJenis();
    // this.options = optJenis.map(v => ({value: v._id, text: v.templateName}));
    this.usahaTable();
  }
    }
  </script>

<style>
    .btn:has(input[value="opsi"]) {
        display: none;
    }
</style>