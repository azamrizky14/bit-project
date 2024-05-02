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
                <li>User</li>
            </ul>
        </div>
        <div class="col-4 text-center">
            <span class="h2">List User</span>
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
                                <b-dropdown-item href="#" @click="paymenType(row.item, row.index, $event.target)">Hak
                                    Akses</b-dropdown-item>
                                <b-dropdown-item href="#"
                                    @click="info(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                                <b-dropdown-item href="#"
                                    @click="edit(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                                <b-dropdown-item @click="changePass(row.item, row.index)">
                                    Ganti Password
                                </b-dropdown-item>
                                <b-dropdown-item href="#" @click="alertDelete('Item')">Hapus</b-dropdown-item>
                            </b-dropdown>
                        </div>
                    </template>
                    <template #cell(userAddress)="data">
                        <template v-for="address in data.value">
                            <p class="m-0"><b>{{ address.nameAddr }}:</b> {{ address.location }}</p>
                        </template>
                    </template>

                </b-table>

                <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal" no-close-on-esc
                    no-close-on-backdrop hide-header-close>
                    <div class="row">
                        <div class="row col-lg-4">
                            <label class="avatar avatar-xxl overflow-hidden d-flex justify-content-center"
                                for="editAvatarUploaderModal">
                                <img src="../assets/img/160x160/img1.jpg" alt="icon">
                            </label>
                        </div>
                        <div class="row col-lg-8">
                            <div class="col-5 d-flex justify-content-between"><span>Kode</span>:</div>
                            <div class="col-7 ps-1">{{ infoModal.content.userCode }}</div>
                            <div class="col-5 d-flex justify-content-between"><span>User</span>:</div>
                            <div class="col-7 ps-1">{{ infoModal.content.userName }}</div>
                            <div class="col-5 d-flex justify-content-between"><span>No. NPWP</span>:</div>
                            <div class="col-7 ps-1">{{ infoModal.content.userTax }}</div>
                            <div class="col-5 d-flex justify-content-between"><span>No. Telp</span>:</div>
                            <div class="col-7 ps-1">{{ infoModal.content.userPhone }}</div>
                            <div class="col-5 d-flex justify-content-between"><span>Email</span>:</div>
                            <div class="col-7 ps-1">{{ infoModal.content.userEmail }}</div>
                            <div class="col-5 d-flex justify-content-between"><span>Alamat</span>:</div>
                            <div class="col-7 ps-1">
                                <template v-for="alamat in infoModal.content.userAddress">
                                    <p class="m-0">- {{ alamat.nameAddr }}: {{ alamat.location }}</p>
                                </template>
                            </div>
                            <!-- <div class="col-5 d-flex justify-content-between"><span>Contact Person</span>:</div>
                            <div class="col-7 ps-1">
                                <template v-for="(person, index) in infoModal.content.userContactPerson">
                                    <p class="m-0">{{ index + 1 }}. {{ person.nama }} ({{ person.HP }})</p>
                                </template>
                            </div> -->
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
                <b-modal :id="procModal.id" :title="procModal.title" stacked @ok="handleAccess" ok-title="Selesai"
                    cancel-title="Kembali">
                    <!-- App Proc Table -->
                    <form ref="form" class="row" @submit.stop.prevent="handleEditAccess">
                        <div class="col-md-12">
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Hak Akses</span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addPayment class="btn p-0" data-toggle="tooltip"
                                        @click="mergeData(optionPayment)">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showPayment" @click="showPayment = !showPayment" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showPayment = !showPayment" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showPayment" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">Kode</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col">Deskripsi</th>
                                        <th scope="col" class="text-center">Akses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(period, i) in optionPayment" :key="i">
                                        <td class="align-top">{{ period.microCode }}</td>
                                        <td class="align-top">{{ period.microName }}</td>
                                        <td class="align-top">{{ period.microDescription }}</td>
                                        <td class="text-center align-top">
                                            <template v-for="(value, key) in period.microAccess" v-if="value">
                                                {{ key }},
                                            </template>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                </b-modal>

                <b-modal :id="editModal.id" :title="editModal.title" @hidden="resetEditModal" @ok="handleEdit"
                    ok-variant="success" ok-title="Edit" cancel-title="Kembali">

                    <form ref="form" class="row" @submit.stop.prevent="handleEditSubmit">
                        <div class="col-md-12 d-flex justify-content-center align-items-center pe-5"
                            style="min-height: 120px;">
                            <div class=" d-flex justify-content-center align-items-end flex-wrap h-100 pe-5">
                                <b-form-group
                                    class="avatar avatar-xl avatar-circle avatar-uploader profile-cover-avatar bg-transparent d-flex align-items-end"
                                    label-for="img1" invalid-feedback="Tambah gambar dulu!"
                                    @change="(event) => previewFiles(event)" tabindex="-1" style="border:none">

                                    <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar"
                                        for="addImage" @change="(event) => previewFiles(event)" tabindex="-1"
                                        invalid-feedback="Provinsi Harus Diisi!" style="margin: 0">
                                        <img v-if="image !== ''" id="editAvatarImgModal" class="avatar-img" :src="image"
                                            alt="Image Description" />
                                        <img v-else id="editAvatarImgModal" class="avatar-img"
                                            src="../assets/img/160x160/img1.jpg" alt="Image Description">
                                        <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input"
                                            id="addImage">
                                        <span class="avatar-uploader-trigger">
                                            <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                        </span>
                                    </label>
                                    <b-form-input tabindex="-1" id="img1" class="js-file-attach avatar-uploader-input"
                                        v-model="image"></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="d-none col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Password
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="d-none col-md-8 my-1">
                            <b-form-group label-for="ItemCode">
                                <b-form-input disabled id="ItemCode" v-model="id"></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Nama User
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemName" invalid-feedback="Nama User Harus Diisi!" :state="NameState">
                                <b-form-input id="ItemName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Jenis User
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <multiselect id="taxType" v-model="contact" :options="optionsCategory" placeholder="Pilih Satu"
                                :taggable="true" @tag="addCategory" :multiple="false" :allow-empty="required">
                            </multiselect>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                No. NPWP
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemType" invalid-feedback="No. NPWP Harus Diisi!" :state="typeState">
                                <b-form-input id="ItemType" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                No. Telepon
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemDesc" invalid-feedback="Nomor Telepon Harus Diisi!"
                                :state="descState">
                                <b-input-group prepend="+62">
                                    <b-form-input id="ItemDesc" v-model="desc" :state="descState" required></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Email
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="ItemContact" invalid-feedback="Deskripsi Harus Diisi!"
                                :state="addressState">
                                <b-form-input id="ItemContact" v-model="address" :state="addressState"
                                    required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Departemen
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <multiselect id="taxType" v-model="dept" :options="optionsDept" placeholder="Pilih Satu"
                                :taggable="true" @tag="addCategoryDept" :multiple="false" :allow-empty="required">
                            </multiselect>
                        </div>
                        <div class="col-md-12 mt-4">
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Alamat</span>
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
                                        <th scope="col">Nama</th>
                                        <th scope="col">Lokasi</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(address, i) in optionAddress" :key="i">
                                        <td>{{ address.nameAddr }}</td>
                                        <td>{{ address.location }}</td>
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
                        <div class="col-md-12 mt-4 d-none">
                            <div class="p-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="h3 text-white m-0">Contact Person</span>
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
                    </form>
                </b-modal>
                <b-modal :id="editProc.id" :title="editProc.title" no-close-on-esc no-close-on-backdrop hide-header-close>
                    <form v-if="addressIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Nama
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Lokasi
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="addrecLocation" invalid-feedback="Lokasi Harus Diisi!"
                                :state="kabState">
                                <b-form-input id="addrecLocation" v-model="kab" :state="kabState" required></b-form-input>
                            </b-form-group>
                        </div>
                    </form>
                    <form v-else-if="contactIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleProcSubmit">
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Nama
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                No. Telepon
                            </h5>
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
                            <h5 class="m-0">
                                Tipe Payment
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="provState">
                                <b-form-input id="toppName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Nomor Payment
                            </h5>
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
                            <h5 class="m-0">
                                Nama Payment
                            </h5>
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
                                <h5 class="m-0">
                                    Nama
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="procName" invalid-feedback="Nama Microservice Harus Diisi!"
                                    :state="NameState">
                                    <b-form-input id="procName" v-model="name" :state="NameState" required></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Kode
                                </h5>
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
                                <h5 class="m-0">
                                    Tipe
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microType" invalid-feedback="Tipe Microservice Harus Diisi!"
                                    :state="typeState">
                                    <b-form-input id="microType" v-model="type" :state="typeState" required></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Deskripsi
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="procDesc">
                                    <b-form-input id="procDesc" v-model="desc"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Icon
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microIcon">
                                    <b-form-input id="microIcon" v-model="image"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Placeholder
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microPleaceholder">
                                    <b-form-input id="microPleaceholder" v-model="prov"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Routing
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microRouting">
                                    <b-form-input id="microRouting" v-model="kab"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    Navigate
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microNaviagate">
                                    <b-form-input id="microNaviagate" v-model="kec"></b-form-input>
                                </b-form-group>
                            </div>

                            <div class="col-4 d-flex align-items-center justify-content-between">
                                <h5 class="m-0">
                                    API Function Script
                                </h5>
                                <h3>:</h3>
                            </div>
                            <div class="col-md-8 my-1">
                                <b-form-group label-for="microFunctionScript">
                                    <b-form-input id="microFunctionScript" v-model="prov"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-4 d-flex pt-3 justify-content-between">
                                <h5 class="m-0">
                                    Data
                                </h5>
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
                            <h5 class="m-0">
                                Nama Proses*
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procName" invalid-feedback="Nama Proses Harus Diisi!"
                                :state="NameState">
                                <b-form-input id="procName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Kode*
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procCode" invalid-feedback="Kode Harus Diisi!" :state="descState">
                                <b-form-input id="procCode" v-model="id" :state="descState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Group App*
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procGroup" invalid-feedback="Group App Harus Diisi!"
                                :state="typeState">
                                <b-form-input id="procGroup" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Deskripsi
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procDesc">
                                <b-form-input id="procDesc" v-model="desc"></b-form-input>
                            </b-form-group>
                        </div>

                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Routing*
                            </h5>
                            <h3>:</h3>
                        </div>
                        <div class="col-md-8 my-1">
                            <b-form-group label-for="procRouting" invalid-feedback="Routing Harus Diisi!"
                                :state="provState">
                                <b-form-input id="procRouting" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-4 d-flex align-items-center justify-content-between">
                            <h5 class="m-0">
                                Icon
                            </h5>
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
                <b-modal id="modal-add" size="lg" title="Tambah User" no-close-on-esc no-close-on-backdrop ref="modal"
                    @show="resetModal" @hidden="resetModal" @ok="handleOk" ok-title="Tambah" cancel-title="Kembali">
                    <form ref="form" class="row p-5" @submit.stop.prevent="handleSubmit">
                        <div class="col-md-3 d-flex justify-content-center">
                            <div class=" d-flex justify-content-center align-items-end flex-wrap pb-3">
                                <b-form-group
                                    class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar bg-transparent d-flex align-items-end"
                                    label-for="img1" invalid-feedback="Tambah gambar dulu!"
                                    @change="(event) => previewFiles(event)" tabindex="-1" style="border:none">

                                    <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar"
                                        for="addImage" @change="(event) => previewFiles(event)" tabindex="-1"
                                        invalid-feedback="Provinsi Harus Diisi!" style="margin: 0">
                                        <img v-if="image !== ''" id="editAvatarImgModal" class="avatar-img" :src="image"
                                            alt="Image Description" />
                                        <img v-else id="editAvatarImgModal" class="avatar-img"
                                            src="../assets/img/160x160/img1.jpg" alt="Image Description">
                                        <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input"
                                            id="addImage">
                                        <span class="avatar-uploader-trigger">
                                            <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                        </span>
                                    </label>
                                    <b-form-input tabindex="-1" id="img1" class="js-file-attach avatar-uploader-input"
                                        v-model="image"></b-form-input>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="col-9 row m-0 p-0">
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Nama" label-for="ItemName" invalid-feedback="Nama User Harus Diisi!"
                                    :state="NameState">
                                    <b-form-input id="ItemName" v-model="name" :state="NameState" required
                                        placeholder="Masukan Nama User"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6">
                                <b-form-group label="Jenis User" label-for="taxType"
                                    invalid-feedback="Jenis User Harus Diisi!" :state="contactState">
                                    <multiselect id="taxType" v-model="contact" :options="optionsCategory"
                                        placeholder="Pilih Satu" :taggable="true" @tag="addCategory" :multiple="false"
                                        :allow-empty="required">
                                    </multiselect>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="No. NPWP" label-for="ItemType" invalid-feedback="No. NPWP Harus Diisi!"
                                    :state="typeState">
                                    <b-form-input id="ItemType" v-model="type" :state="typeState" required
                                        placeholder="Masukan No.NPWP"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Nomor Telepon" label-for="usahaTelp"
                                    invalid-feedback="Nomor Telepon Harus Diisi!" :state="descState">
                                    <b-input-group prepend="+62">
                                        <b-form-input type="number" id="usahaTelp" v-model="desc" :state="descState"
                                            required placeholder="812212121212"></b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Email" label-for="ItemContact" invalid-feedback="Email Tidak Valid!"
                                    :state="addressState">
                                    <b-form-input type="email" id="ItemContact" v-model="address" :state="addressState"
                                        required placeholder="contoh@email.com"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Password" label-for="ItemPass" invalid-feedback="Password Harus Diisi!"
                                    :state="imageState">
                                    <b-form-input type="password" id="ItemPass" :state="imageState" v-model="code" required
                                        placeholder="Masukan Password"></b-form-input>
                                </b-form-group>
                            </div>
                            <div class="col-md-6">
                                <b-form-group label="Departemen" label-for="taxType"
                                    invalid-feedback="Departemen User Harus Diisi!" :state="contactState">
                                    <multiselect id="taxType" v-model="dept" :options="optionsDept" placeholder="Pilih Satu"
                                        :taggable="true" @tag="addCategoryDept" :multiple="false" :allow-empty="required">
                                    </multiselect>
                                </b-form-group>
                            </div>
                        </div>
                        <div class="col-md-5 mt-4">
                            <div class="px-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Alamat</span>
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
                                        <th scope="col">Nama</th>
                                        <th scope="col">Lokasi</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(address, i) in optionAddress" :key="i">
                                        <td>{{ address.nameAddr }}</td>
                                        <td>{{ address.location }}</td>
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
                        <div class="col-md-6 mt-4 d-none">
                            <div class="p-2 bg-primary d-flex justify-content-between align-items-center">
                                <span class="h3 text-white m-0">Contact Person</span>
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
                        <div class="col-md-7 mt-4">
                            <div class="px-2 bg-dark d-flex justify-content-between align-items-center">
                                <span class="text-white m-0">Hak Akses</span>
                                <div class="d-flex align-items-center">
                                    <button type="button" v-b-modal.modal-addPayment class="btn p-0" data-toggle="tooltip"
                                        @click="mergeData(optionPayment)" title="Tambah Hak Akses">
                                        <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                    </button>
                                    <button v-if="showPayment" @click="showPayment = !showPayment" type="button"
                                        class="btn p-0" data-toggle="tooltip" title="Hide">
                                        <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                    <button v-else @click="showPayment = !showPayment" type="button" class="btn p-0"
                                        data-toggle="tooltip" title="Show">
                                        <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                    </button>
                                </div>
                            </div>
                            <table v-if="showPayment" class="table border">
                                <thead>
                                    <tr>
                                        <th scope="col">Tipe</th>
                                        <th scope="col">Kode</th>
                                        <th scope="col">Nama</th>
                                        <th scope="col" class="text-center">Opsi</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr v-for="(period, i) in optionPayment" :key="i">
                                        <td class="align-top">{{ period.microCode }}</td>
                                        <td class="align-top">{{ period.microName }}</td>
                                        <td class="align-top">{{ period.microDescription }}</td>
                                        <td class="text-center align-top">
                                            <template v-for="(value, key) in period.microAccess" v-if="value">
                                                {{ key }},
                                            </template>
                                        </td>
                                    </tr>
                                    <!-- <tr v-for="(payment, i) in optionPayment" :key="i">
                                        <td>{{ payment.Type }}</td>
                                        <td>{{ payment.Number }}</td>
                                        <td>{{ payment.Name }}</td>
                                        <td class="text-center">
                                            <button type="button" class="btn p-0"
                                                @click="editPayment(payment, i, $event.target)">
                                                <i class="bi bi-pencil-square text-warning"></i>
                                            </button>
                                            <button type="button" class="btn p-0" @click="removePayment(i)">
                                                <i class="bi bi-trash text-danger"></i>
                                            </button>
                                        </td>
                                    </tr> -->
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
                            <b-form-group class="h5 my-1" label="Nama Microservice" label-for="microName"
                                invalid-feedback="Nama Microservice Harus Diisi!" :state="NameState">
                                <b-form-input id="microName" v-model="name" :state="NameState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="Tipe Microservice" label-for="microType"
                                invalid-feedback="Tipe Microservice Harus Diisi!" :state="typeState">
                                <b-form-input id="microType" v-model="type" :state="typeState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="Deskripsi Microservice" label-for="microDesc">
                                <b-form-input id="microDesc" v-model="desc"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="icon Microservice" label-for="microImage">
                                <b-form-input id="microImage" v-model="image"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="Placeholder Microservice" label-for="microPleaceholder">
                                <b-form-input id="microPleaceholder" v-model="prov"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="Routing Microservice" label-for="microRouting">
                                <b-form-input id="microRouting" v-model="kab"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="Navigasi Microservice" label-for="microNavigate">
                                <b-form-input id="microNavigate" v-model="kec"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group class="h5 my-1" label="API Function Script" label-for="microAddress">
                                <b-form-input id="microAddress" v-model="address"></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-3 mb-2">
                            <b-form-group class="h5 my-1" label="Kode Microservice" label-for="microData"
                                invalid-feedback="Kode Microservice Harus Diisi!" :state="descState">

                                <b-input-group :prepend="this.infoModal.content.appProcCode + '.'">
                                    <b-form-input id="microData" type="number" v-model="microCode" :state="descState"
                                        required></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </div>
                        <div class="col-md-9 mb-2">
                            <b-form-group class="h5 my-1" label="Data Microservice" label-for="microData">
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
                <b-modal id="modal-addAddress" size="sm" title="Tambah Alamat" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkAddress">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitAddress">
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Nama Alamat" label-for="addressName"
                                invalid-feedback="Nama Alamat Harus Diisi!" :state="provState">
                                <b-form-input id="addressName" v-model="prov" :state="provState" required></b-form-input>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2">
                            <b-form-group label="Lokasi" label-for="usahaLokasi" invalid-feedback="Lokasi Harus Diisi!"
                                :state="kabState">
                                <textarea class="form-control" id="usahaLokasi" v-model="kab" :state="kabState" required
                                    rows="4"></textarea>
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
                <b-modal id="modal-addPayment" size="md" title="Tambah Hak Akses" hide-header-close no-close-on-esc
                    no-close-on-backdrop ref="modal" @hidden="resetArray" @ok="handleOkPayment">
                    <form ref="form" class="row" @submit.stop.prevent="handleSubmitPayment">
                        <template>
                            <label for="allCheck" @click="handleCheck" class="mb-2">
                                <input id="allCheck" class="form-check-input border-dark" type="checkbox"
                                    v-model="checkAll">
                                Check All
                            </label>
                            <div class="col-md-12">
                                <table v-if="showPayment" class="table table-bordered">
                                    {{ showPayment }}
                                    <thead class="">
                                        <tr>
                                            <th scope="col" class="text-center">Kode</th>
                                            <th scope="col" class="text-center">Nama</th>
                                            <th scope="col" class="text-center">Create</th>
                                            <th scope="col" class="text-center">Read</th>
                                            <th scope="col" class="text-center">Update</th>
                                            <th scope="col" class="text-center">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(cok, i) in arrBlank">
                                            <td>{{ cok.microCode }}</td>
                                            <td>{{ cok.microName }}</td>
                                            <td class="text-center">
                                                <input class="form-check-input border-dark" type="checkbox"
                                                    v-model="cok.microAccess.create">
                                            </td>
                                            <td class="text-center">
                                                <input class="form-check-input border-dark" type="checkbox"
                                                    v-model="cok.microAccess.read">
                                            </td>
                                            <td class="text-center">
                                                <input class="form-check-input border-dark" type="checkbox"
                                                    v-model="cok.microAccess.update">
                                            </td>
                                            <td class="text-center">
                                                <input class="form-check-input border-dark" type="checkbox"
                                                    v-model="cok.microAccess.delete">
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </template>
                    </form>
                </b-modal>

                <!-- Button trigger modal -->
                <!-- End Button trigger modal -->

                <!-- Modal -->
                <div id="exampleModalTopCover" class="modal fade" tabindex="-1" role="dialog"
                    aria-labelledby="exampleModalTopCoverTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <!-- Header -->
                            <div class="modal-top-cover bg-dark text-center">
                                <figure class="position-absolute end-0 bottom-0 start-0">
                                    <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                        viewBox="0 0 1920 100.1">
                                        <path fill="#fff" d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z" />
                                    </svg>
                                </figure>

                                <div class="modal-close" @keydown.esc="onEscape">
                                    <button type="button" class="btn-close btn-close-light" data-bs-dismiss="modal"
                                        aria-label="Close" @click="resetPass"></button>
                                </div>
                            </div>
                            <!-- End Header -->

                            <div class="modal-top-cover-icon">
                                <span class="icon icon-lg icon-light icon-circle icon-centered shadow-sm">
                                    <i class="bi-file-lock fs-2"></i>
                                </span>
                            </div>

                            <div class="modal-body text-center">
                                <h3 class="m-0">Ganti Password</h3>
                                <template v-if="passData !== null">
                                    ({{ passData.userName }})
                                </template>
                                <template v-else>
                                    ()
                                </template>
                                <div class="row mt-2">
                                    <div class="col-12 my-2">
                                        <input type="password" placeholder="Masukan Password Lama" v-model="pass">
                                    </div>
                                    <div class="col-12 my-2">
                                        <input type="password" placeholder="Masukan Password Baru" v-model="newPass">
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-white" data-bs-dismiss="modal"
                                    @click="resetPass">Batal</button>
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                                    @click="sendData">Simpan</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End Modal -->

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

import axios from "axios";
import { getUser, addUser, updateUser, getListUser, getUsaha, getO, updatePassword } from '../components/services/components'
import { addProc, addMicro, updateProc, updateMicro } from "./services/usaha";
export default {
    data() {
        return {
            passData: '',
            pass: null,
            newPass: null,
            dept: '',
            optionsDept: [],
            checkAll: false,
            arrBlank: [],
            listUsaha: [],
            showAddress: true,
            showContact: true,
            showPayment: true,
            optionAddress: [],
            optionContact: [],
            optionPayment: [],
            addressIndex: '',
            contactIndex: '',
            paymentIndex: '',

            optionsCategory: [],

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

            listLogo: [],
            dataId: '',
            procId: '',
            microId: '',
            dataIndex: '',
            procIndex: '',
            microIndex: '',
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 15, 25],
            fields: ['userName', 'userCode', 'userTax', 'userAddress', 'userPhone', 'userEmail', 'opsi'],
            sorts: [],
            selected: ['userName', 'userCode', 'userTax', 'userAddress', 'userPhone', 'userEmail', 'opsi'],
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
        async sendData() {
            this.alertLoading();
            try {
                const id = this.passData._id
                const data = {
                    pass: this.newPass
                }
                await updatePassword(data,id)
                this.successAdd()
            }
            catch (error) {
                alert('gagal')
                this.failedAdd()
            }
        },
        changePass(data) {
            $('#exampleModalTopCover').modal('show');
            this.resetPass()
            this.passData = data
        },
        onEscape(event) {
            if (event.keyCode === 27) {
                this.resetPass()
            }
        },
        resetPass() {
            this.pass = null
            this.newPass = null
            this.passData = null
        },
        handleCheck() {
            this.checkAll = !this.checkAll
            if (this.checkAll) {
                this.arrBlank = this.arrBlank.map(x => ({ ...x, microAccess: { create: true, read: true, update: true, delete: true } }))
            } else {
                this.arrBlank = this.arrBlank.map(x => ({ ...x, microAccess: { create: false, read: false, update: false, delete: false } }))
            }
        },
        checkEmail(data) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            //   return emailPattern.test(data);
            if (emailPattern.test(data)) {
                return true
            } else {
                return false
            }
        },
        addCategory(newCat) {
            this.optionsCategory.push(newCat);
            this.contact = newCat;
        },
        addCategoryDept(newCat) {
            this.optionsDept.push(newCat);
            this.dept = newCat;
        },
        editPhone(phone) {
            console.log(phone)
            if (phone.length > 0) {
                return phone.slice(1);
            } else {
                return phone
            }
        },
        async mergeData(data) {
            const merged = [...data]
            this.changeData()
            if (merged.length !== 0) {
                merged.forEach(updateItem => {
                    const itemToUpdate = this.arrBlank.find(item => item.microCode === updateItem.microCode);
                    if (itemToUpdate) {
                        itemToUpdate.microAccess = updateItem.microAccess
                    }
                })

                this.optionPayment = data
            }
        },
        changeData() {
            this.checkAll = false
            this.arrBlank = []
            this.listMenu.forEach(x => {
                this.arrBlank.push(x)
            })
            this.arrBlank = this.arrBlank.map(x => ({ ...x, microAccess: { create: false, read: false, update: false, delete: false } }))
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
            if (this.prov && this.kab) {
                const data = {
                    nameAddr: this.prov,
                    location: this.kab,
                }
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
        },
        editAddress(item, index, button) {
            this.editProc.title = 'Edit Address'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.addressIndex = index
            const addressContent = this.optionAddress[index]
            this.prov = addressContent.nameAddr
            this.kab = addressContent.location
        },
        saveEditAddress() {
            if (this.prov && this.kab) {
                const topp = this.optionAddress[this.addressIndex]
                const data = {
                    nameAddr: this.prov,
                    location: this.kab,
                }
                this.optionAddress[this.addressIndex] = data
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
                title: 'Hapus Hak Akses?',
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
            // this.optionPayment.push(data)
            this.optionPayment = this.arrBlank.filter(obj => {
                return Object.values(obj.microAccess).some(x => x === true)
            })
            this.$swal({
                icon: 'success',
                title: 'Hak Akses Ditambahkan!',
                showConfirmButton: false,
                timer: 1500
            })
            this.$nextTick(() => {
                this.$bvModal.hide('modal-addPayment')
            });
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
                    title: 'Hak Akses Diedit!',
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
        getLogo(imageUrls) {
            Promise.all(
                imageUrls.map(url =>
                    axios.get(url, {
                        responseType: 'blob' // Set the response type to arraybuffer to handle binary data
                    }).then(responses => URL.createObjectURL(responses.data))
                )
            )
                .then(imageUrls => {
                    this.listLogo = imageUrls.map(url => ({ icon: url }));
                    this.Item = this.Item.map((item, index) => Object.assign({}, item, this.listLogo[index]))
                })
        },
        async ItemTable() {
            this.Item = await getUser();
            console.log(this.Item)
            // const imageUrls = this.Item.map(logo => logo.domainLogo);
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
                text: "Tekan Simpan jika anda sudah yakin!",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Simpan'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    this.alertLoading()
                    if (typeData === 'Item') {
                        if (this.xFilEkey === null) {
                            this.xFilEkey = []
                        }

                        const data = {
                            userDomainCode: JSON.parse(localStorage.getItem('userDomainCode') || '[]'),
                            userPassword: this.code,
                            userCode: '', //Sementara
                            userType: this.contact,
                            userName: this.name,
                            userTax: this.type,
                            userPhone: '0' + this.desc,
                            userEmail: this.address,
                            userAddress: this.optionAddress,
                            userContactPerson: this.optionContact,
                            userRolesApps: this.optionPayment.map(item => {
                                const { microIcon, ...rest } = item
                                return rest
                            }),
                            userDepartemen: this.dept,
                            userImage: "",
                            userToken: ""
                        }
                        // const formData = new FormData();
                        // formData.append('userCode', '0001');
                        // formData.append('userType', 'user');
                        // formData.append('userName', this.name);
                        // formData.append('userTax', this.type);
                        // formData.append('userPhone', '0'+this.desc);
                        // formData.append('userEmail', this.address);
                        // formData.append('userAddress', this.optionAddress);
                        // formData.append('userContactPerson', this.optionContact);
                        // formData.append('userTypePayment', this.optionPayment);
                        // formData.append('xFilekey', this.xFilEkey);

                        try {
                            // await addFormData(formData)
                            console.log(data)
                            await addUser(data)
                            await this.ItemTable()
                            this.$bvModal.hide('modal-add')
                            this.successAdd()
                        } catch (error) {
                            alert(error)
                        }
                    } else if (typeData === 'ChangePass') {
                        const id = this.passData._id
                        const data = {
                            pass: this.pass,
                        }
                        try {
                            await updatePassword(data, id)
                            await this.ItemTable()
                            this.$bvModal.hide('modal-add')
                            this.successAdd()
                        } catch (error) {
                            alert(error)
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
                        if (this.xFilEkey === null) {
                            this.xFilEkey = ""
                        }
                        const uId = this.contact
                        const data = {
                            userName: this.name,
                            userPhone: '0' + this.desc,
                            userTax: this.type,
                            userEmail: this.address,
                            userImage: this.xFilEkey,
                            userAddress: this.optionAddress,
                            userContactPerson: this.optionContact,
                            userTypePayment: this.optionPayment
                        }
                        try {
                            await updateUser(data, uId);
                            await this.ItemTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('edit-modal')
                        this.successEdit()
                    } else if (typeData === 'Access') {
                        const uId = this.id
                        const data = {
                            userRolesApps: this.optionPayment.map(x => ({ microAccess: x.microAccess, microCode: x.microCode, microName: x.microName, microDescription: x.microDescription }))
                        }
                        try {
                            // console.log(data, uId)
                            await updateUser(data, uId);
                            await this.ItemTable()
                        } catch (error) {
                            alert(error)
                        }
                        this.$bvModal.hide('proc-modal')
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
            this.image = ''
            this.addressIndex = ''
            this.contactIndex = ''
            this.paymentIndex = ''

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

            this.provState = null
            this.kabState = null
            this.kecState = null
        },
        resetModal() {
            this.contact = ''
            this.dept = ''
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
            this.editModal.title = `Edit Data - ${Item.userName}`
            this.editModal.content = Item
            this.$root.$emit('bv::show::modal', this.editModal.id, button)

            this.contact = this.editModal.content._id
            this.id = this.editModal.content.userCode
            this.name = this.editModal.content.userName
            this.type = this.editModal.content.userTax
            this.desc = this.editModal.content.userPhone.slice(1)
            this.address = this.editModal.content.userEmail
            this.dept = this.editModal.content.userDepartemen
            this.contact = this.editModal.content.userType
            this.optionAddress = this.editModal.content.userAddress
            this.optionContact = this.editModal.content.userContactPerson
            this.optionPayment = this.editModal.content.userTypePayment
        },
        paymenType(Item, index, button) {
            this.procModal.title = `Hak Akses: ${Item.userName}`
            this.procModal.content = Item
            this.$root.$emit('bv::show::modal', this.procModal.id, button)
            this.id = this.procModal.content._id
            console.log(this.procModal.content.userRolesApps)
            this.mergeData(this.procModal.content.userRolesApps)
        },
        handleEdit(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleEditSubmit()
        },
        handleEditSubmit() {
            // Exit when the form isn't valid
            if (this.name && this.desc && this.address, this.type) {
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
        handleAccess(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleEditAccess()
        },
        handleEditAccess() {
            this.alertEdit('Access')
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
            this.changeData()

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
            this.infoModal.title = `Detail Data - ${Item.userName}`
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
            if (this.name && this.type && this.desc && this.contact && this.code && this.checkEmail(this.address)) {
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
            if (!this.checkEmail(this.address)) {
                this.addressState = false;
            } else {
                this.addressState = true;
            }
            if (!this.code) {
                this.imageState = false;
            } else {
                this.imageState = true;
            }
            if (!this.contact) {
                this.contactState = false;
            } else {
                this.contactState = true;
            }
        },
    },
    computed: {
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
                if (v === 'userCode') {
                    Item['label'] = "Kode"
                }
                if (v === 'userTax') {
                    Item['label'] = "No. NPWP"
                }
                if (v === 'userName') {
                    Item['label'] = "Nama User"
                }
                if (v === 'userAddress') {
                    Item['label'] = "Alamat"
                    Item['thStyle'] = "width: 200px"
                }
                if (v === 'userPhone') {
                    Item['label'] = "No. Telp"
                }
                if (v === 'userEmail') {
                    Item['label'] = "email"
                }
                return Item
            });
        },

    },
    async mounted() {
        this.$store.commit('setBtnList', [])
        this.$store.commit('setTopbarTitle', "Data User");
        const optJenis = [];
        this.options = optJenis.map(v => ({ value: v._id, text: v.templateName }));
        this.ItemTable();
        this.optionsCategory = await getListUser()
        const cok = await getUsaha()
        this.listMenu = cok.filter(x => x.name === 'Menuoutlet')[0].subMenu
        this.optionsDept = await getO()
    }
}
</script>

<style>.btn:has(input[value="opsi"]) {
    display: none;
}</style>