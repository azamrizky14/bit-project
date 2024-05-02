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
                    <li>Master Item</li>
                </ul>
            </div>
            <div class="col-4 text-center">
                <span class="h2">List Master Item</span>
            </div>
            <hr class="mb-3 mt-1">
        </div>
        <!-- Page Header -->
        <div class="card mb-3 mb-lg-5">
            <!-- Header -->
            <b-row>
                <b-col class="d-flex align-items-center">
                    <b-input-group size="sm" class="mx-2">
                        <b-form-input id="filter-input" v-model="filter" type="search"
                            placeholder="Type to Search"></b-form-input>

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
                        <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="fields" name="flavour-1"
                            buttons>
                        </b-form-checkbox-group>
                    </b-dropdown>
                </b-col>
            </b-row>
            <!-- Main Table -->
            <b-table ref="tableUsaha" label-sort-asc="" label-sort-desc="" label-sort-clear="" :bordered="true" stacked="md"
                :items="usaha" :fields="activeFields" :current-page="currentPage" :per-page="perPage" :filter="filter"
                tbody-tr-class="row-class" @filtered="onFiltered" v-if="selected.length > 0">>
                <template #cell(opsi)="row" style="width: 100px">
                    <div width="0px">
                        <b-dropdown id="dropdown-right" right text="Right align" variant="primary" size="xs">
                            <template #button-content>
                                <i class="bi-gear-fill"></i>
                            </template>
                            <b-dropdown-item href="#"
                                @click="info(row.item, row.index, $event.target)">Detail</b-dropdown-item>
                            <b-dropdown-item href="#"
                                @click="edit(row.item, row.index, $event.target)">Edit</b-dropdown-item>
                            <b-dropdown-item href="#" @click="alertDelete">Hapus</b-dropdown-item>
                        </b-dropdown>
                    </div>
                </template>
                <template #cell(icon)="row">
                </template>

            </b-table>
            <b-modal :id="infoModal.id" size="lg" :title="infoModal.title" ok-only @hide="resetInfoModal" no-close-on-esc
                no-close-on-backdrop hide-header-close :body-class="['p-0']">
                <b-tabs class=" custom-tabs" content-class="mt-3 px-5" card>
                    <b-tab title="General" active>
                        <div class="row">
                            <div class="col-md-3 d-flex justify-content-center">
                                <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar"
                                    for="addImage" @change="(event) => previewFiles(event)" tabindex="-1"
                                    invalid-feedback="Provinsi Harus Diisi!" :state="imageState" style="margin: 0">
                                    <img v-if="general.image !== ''" id="editAvatarImgModal" class="avatar-img"
                                        :src="general.image" alt="Image Description" />
                                    <img v-else id="editAvatarImgModal" class="avatar-img" src="assets/img/160x160/img0.jpg"
                                        alt="Image Description">
                                    <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input"
                                        id="addImage" :state="imageState" required disabled>
                                    <span class="avatar-uploader-trigger">
                                        <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                    </span>
                                </label>
                            </div>

                            <div class="row col-md-9">
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Kode (Barcode)" label-for="itemCode"
                                        invalid-feedback="Kode Item Harus Diisi!" :state="groupState">
                                        <b-form-input id="itemCode" v-model="group" :state="groupState" required disabled
                                            placeholder="Kode Item (Barcode)"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Nama" label-for="itemName"
                                        invalid-feedback="Nama Item Harus Diisi!" :state="NameState">
                                        <b-form-input id="itemName" v-model="name" :state="NameState" required disabled
                                            placeholder="Nama Item"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Deskripsi (Spec)" label-for="itemDefStatus"
                                        invalid-feedback="Deskripsi Harus Diisi!" :state="descState">
                                        <b-form-input id="itemDefStatus" v-model="desc" :state="descState" required disabled
                                            placeholder="Deskripsi Item"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Merk" label-for="itemAddMerk"
                                        invalid-feedback="Tipe Item Harus Diisi!">
                                        <b-form-input id="itemAddMerk" v-model="general.merk" required disabled
                                            placeholder="Merk Item"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Tipe" label-for="itemAddType"
                                        invalid-feedback="Tipe Item Harus Diisi!">
                                        <b-form-input id="itemAddType" v-model="general.type" required disabled
                                            placeholder="Tipe Item"></b-form-input>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                </div>
                                <div class="col-md-12">
                                    <hr class="my-2">
                                </div>
                                <div class="col-md-6  mb-2">
                                    <b-form-group label="Kategori" label-for="itemCat"
                                        invalid-feedback="Kategori Item Harus Diisi!" :state="katState">
                                        <multiselect id="itemCat" v-model="kat" :options="optionsCategory" disabled
                                            placeholder="Pilih Kategori" :taggable="true" @tag="addCategory"
                                            :multiple="false" :allow-empty="required" :show-labels="false">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Jenis" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect id="itemJenis" v-model="general.jenis" :options="optionsJenis"
                                            placeholder="Pilih Jenis" :multiple="false" :allow-empty="required" disabled
                                            :show-labels="false">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Grup" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect v-model="general.group" :options="optionsGroup" :multiple="true"
                                            :clear-on-select="false" :preserve-search="true" disabled
                                            :class="general.group === null ? 'invalid' : ''" placeholder="Pilih Grup">
                                            <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                    class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                        values.length }} data dipilih</span>
                                            </template>
                                        </multiselect>
                                        <template v-if="general.group">
                                            <pre v-if="general.group.length > 0">
Grup List :
<template v-for="data in general.group">- {{ data }}
</template>
</pre>
                                        </template>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Bundling" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect v-model="general.bundling" :options="usaha" label="itemName"
                                            :multiple="true" :clear-on-select="false" :preserve-search="true" disabled
                                            placeholder="Item Bundling" track-by="_id">
                                            <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                    class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                        values.length }} data dipilih</span>
                                            </template>
                                        </multiselect>
                                        <pre v-if="general.bundling.length > 0">
Bundling List :
<template v-for="data in general.bundling">- {{ data.itemName }}
</template>
</pre>
                                    </b-form-group>
                                </div>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="Finance">
                        <div class="row">
                            <div class="col-md-12 mb-2">
                                <b-form-group label="Kode Akun" label-for="itemCat"
                                    invalid-feedback="Anda Harus Memilih Kode Akun!" :state="typeState">
                                    <multiselect id="itemCat" v-model="type" :options="optionsCoa" disabled
                                        placeholder="Select one" :taggable="false" :multiple="false" track-by="_id"
                                        :show-labels="false" :custom-label="customLabel" :allow-empty="required">
                                    </multiselect>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Standart HPP" label-for="financeHPP">
                                    <b-input-group prepend="Rp.">
                                        <input v-format-number class="form-control" id="financeHPP" disabled
                                            v-model="finance.standartHPP" required placeholder="100,000"></input>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Standar Jasa" label-for="financeJasa">
                                    <b-input-group prepend="Rp.">
                                        <input v-format-number class="form-control" id="financeJasa" disabled
                                            v-model="finance.standartLabour" required placeholder="100,000"></input>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Default UM" label-for="itemSatuan"
                                    invalid-feedback="Anda Harus Memilih Satuan!" :state="dateState">
                                    <multiselect id="itemSatuan" v-model="finance.itemUm" :options="optionsUm"
                                        placeholder="Pilih Default UM" :taggable="true" @tag="addConvert2" disabled
                                        :multiple="false" :allow-empty="required">
                                    </multiselect>
                                </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Harga Jual (Default Price)" label-for="itemPrice"
                                    invalid-feedback="Harga Item Harus Diisi!" :state="priceState">
                                    <b-input-group prepend="Rp.">
                                        <input v-format-number class="form-control" id="itemPrice" v-model="price" disabled
                                            :state="priceState" required placeholder="100,000"></input>
                                    </b-input-group>
                                </b-form-group>
                            </div>

                            <div class="col-md-4 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center"
                                    style="background: #113448">
                                    <span class="text-white m-0">Topping/Add-Ons</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showTopping" @click="showTopping = !showTopping" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showTopping = !showTopping" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showTopping" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(topping, i) in optionTopping" :key="i">
                                            <td>{{ topping.name.itemName }}</td>
                                            <td>{{ topping.price }}</td>
                                            <td class="text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="editPrice(topping, i, $event.target)">
                                                    <i class="bi bi-pencil-square text-warning"></i>
                                                </button>
                                                <button type="button" class="btn p-0" @click="removeData(i)">
                                                    <i class="bi bi-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <!-- Edit Price -->
                            <div class="col-md-8 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center"
                                    style="background: #113448">
                                    <span class="text-white m-0">Master Harga</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showPrice" @click="showPrice = !showPrice" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showPrice = !showPrice" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showPrice" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Nama</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(price, i) in optionAdd" :key="i">
                                            <td class="align-top">{{ price.name }}</td>
                                            <td>
                                                <p class="m-0" v-for="data in price.masterPrice">{{ data.priceQty }}</p>
                                            </td>
                                            <td>
                                                <p class="m-0" v-for="data in price.masterPrice">{{ data.priceValue }}
                                                </p>
                                            </td>
                                            <td class="text-center align-top">
                                                <button type="button" class="btn p-0"
                                                    @click="detailPrice(price, i, $event.target)">
                                                    <i class="bi bi-eye text-success"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- end modal price -->

                            <div class="col-md-12 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                    <span class="text-white m-0">Diskon</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showDiskon" @click="showDiskon = !showDiskon" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showDiskon = !showDiskon" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showDiskon" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Tipe</th>
                                            <th scope="col">Nominal</th>
                                            <th scope="col">Tgl. Mulai</th>
                                            <th scope="col">Tgl. Selesai</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(diskon, i) in optionDiskon" :key="i">
                                            <td>{{ diskon.diskonQty }}</td>
                                            <td>{{ diskon.diskonType }}</td>
                                            <td>{{ diskon.diskonValue }}</td>
                                            <td>{{ diskon.diskonStartDate }}</td>
                                            <td>{{ diskon.diskonEndDate }}</td>
                                            <td class="text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="editPrice(diskon, i, $event.target)">
                                                    <i class="bi bi-pencil-square text-warning"></i>
                                                </button>
                                                <button type="button" class="btn p-0" @click="removeData(i)">
                                                    <i class="bi bi-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="col-md-12 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center"
                                    style="background: #113448">
                                    <span class="text-white m-0">Pajak</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showTax" @click="showTax = !showTax" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Hide">
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
                                            <th scope="col">Jumlah</th>
                                            <th scope="col">Tgl.Mulai</th>
                                            <th scope="col">Tgl. Selesai</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(tax, i) in optionTax" :key="i">
                                            <td>{{ tax.taxName }}</td>
                                            <td>{{ tax.taxQty }}</td>
                                            <td>{{ tax.taxStartDate }}</td>
                                            <td>{{ tax.taxEndDate }}</td>
                                            <td class="text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="editPrice(tax, i, $event.target)">
                                                    <i class="bi bi-pencil-square text-warning"></i>
                                                </button>
                                                <button type="button" class="btn p-0" @click="removeData(i)">
                                                    <i class="bi bi-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-tab>
                    <b-tab title="Inventory">
                        <div class="row">
                            <!-- default location po receipt -->
                            <div class="col-md-6 mb-2">
                                <b-form-group label="PO receipt" label-for="itemJenis"
                                    invalid-feedback="Jenis Item Harus Diisi!">
                                    <multiselect id="itemJenis" v-model="inventory.poReceipt" :options="optionsLocation"
                                        placeholder="Lokasi Default PO receipt" :multiple="false" disabled
                                        :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                    </multiselect>
                                </b-form-group>
                            </div>
                            <!-- default location wo receipt -->
                            <div class="col-md-6 mb-2">
                                <b-form-group label="WO receipt" label-for="itemJenis"
                                    invalid-feedback="Jenis Item Harus Diisi!">
                                    <multiselect id="itemJenis" v-model="inventory.woReceipt" :options="optionsLocation"
                                        placeholder="Lokasi Default WO receipt" :multiple="false" disabled
                                        :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                    </multiselect>
                                </b-form-group>
                            </div>
                            <!-- unit konversi -->
                            <div class="col-md-12 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                    <span class="text-white m-0">Unit Konversi</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showConvert" @click="showConvert = !showConvert" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showConvert = !showConvert" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showConvert" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">*Qty. Awal</th>
                                            <th scope="col">*UM. Awal</th>
                                            <th scope="col">*Qty. Konversi</th>
                                            <th scope="col">*UM. Konversi</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(convert, i) in optionConvert" :key="i">
                                            <td>{{ convert.qtyA }}</td>
                                            <td>{{ convert.umA }}</td>
                                            <td>{{ convert.qtyB }}</td>
                                            <td>{{ convert.umB }}</td>
                                            <td class="text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="editConvert(convert, i, $event.target)">
                                                    <i class="bi bi-pencil-square text-warning"></i>
                                                </button>
                                                <button type="button" class="btn p-0"
                                                    @click="removeData(i, 'optionConvert')">
                                                    <i class="bi bi-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-tab>
                </b-tabs>
                <template #modal-footer>
                    <div class="w-100 d-flex justify-content-end">
                        <b-button class="me-2" variant="secondary" size="sm" @click="$bvModal.hide('info-modal')">
                            Kembali
                        </b-button>
                        <!-- <b-button size="sm" variant="primary" @click="addMicroservice">Tambah Micro</b-button> -->
                    </div>
                </template>
            </b-modal>

            <b-modal :id="editModal.id" size="lg" :title="editModal.title" @hidden="resetEditModal" @ok="handleEdit"
                ok-title="Simpan" :body-class="['p-0']">

                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-tabs class=" custom-tabs" content-class="mt-3 px-5" card>
                        <b-tab title="General" active>
                            <div class="row">
                                <div class="col-md-3 d-flex justify-content-center">
                                    <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar"
                                        for="addImage" @change="(event) => previewFiles(event)" tabindex="-1"
                                        invalid-feedback="Provinsi Harus Diisi!" :state="imageState" style="margin: 0">
                                        <img v-if="general.image !== ''" id="editAvatarImgModal" class="avatar-img"
                                            :src="general.image" alt="Image Description" />
                                        <img v-else id="editAvatarImgModal" class="avatar-img"
                                            src="assets/img/160x160/img0.jpg" alt="Image Description">
                                        <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input"
                                            id="addImage" :state="imageState" required>
                                        <span class="avatar-uploader-trigger">
                                            <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                        </span>
                                    </label>
                                </div>

                                <div class="row col-md-9">
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Kode (Barcode)" label-for="itemCode"
                                            invalid-feedback="Kode Item Harus Diisi!" :state="groupState">
                                            <b-form-input id="itemCode" v-model="group" :state="groupState" required
                                                placeholder="Kode Item (Barcode)"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Nama" label-for="itemName"
                                            invalid-feedback="Nama Item Harus Diisi!" :state="NameState">
                                            <b-form-input id="itemName" v-model="name" :state="NameState" required
                                                placeholder="Nama Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Deskripsi (Spec)" label-for="itemDefStatus"
                                            invalid-feedback="Deskripsi Harus Diisi!" :state="descState">
                                            <b-form-input id="itemDefStatus" v-model="desc" :state="descState" required
                                                placeholder="Deskripsi Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Merk" label-for="itemAddMerk"
                                            invalid-feedback="Tipe Item Harus Diisi!">
                                            <b-form-input id="itemAddMerk" v-model="general.merk" required
                                                placeholder="Merk Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Tipe" label-for="itemAddType"
                                            invalid-feedback="Tipe Item Harus Diisi!">
                                            <b-form-input id="itemAddType" v-model="general.type" required
                                                placeholder="Tipe Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                    </div>
                                    <div class="col-md-12">
                                        <hr class="my-2">
                                    </div>
                                    <div class="col-md-6  mb-2">
                                        <b-form-group label="Kategori" label-for="itemCat"
                                            invalid-feedback="Kategori Item Harus Diisi!" :state="katState">
                                            <multiselect id="itemCat" v-model="kat" :options="optionsCategory"
                                                placeholder="Pilih Kategori" :taggable="true" @tag="addCategory"
                                                :multiple="false" :allow-empty="required" :show-labels="false">
                                            </multiselect>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Jenis" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect id="itemJenis" v-model="general.jenis" :options="optionsJenis"
                                                placeholder="Pilih Jenis" :multiple="false" :allow-empty="required"
                                                :show-labels="false">
                                            </multiselect>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Grup" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect v-model="general.group" :options="optionsGroup" :multiple="true"
                                                :clear-on-select="false" :preserve-search="true"
                                                :class="general.group === null ? 'invalid' : ''" placeholder="Pilih Grup">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                            values.length }} data dipilih</span>
                                                </template>
                                            </multiselect>
                                            <template v-if="general.group">
                                                <pre v-if="general.group.length > 0">
Grup List :
<template v-for="data in general.group">- {{ data }}
</template>
</pre>
                                            </template>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Bundling" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect v-model="general.bundling" :options="usaha" label="itemName"
                                                :multiple="true" :clear-on-select="false" :preserve-search="true"
                                                placeholder="Item Bundling" track-by="_id">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                            values.length }} data dipilih</span>
                                                </template>
                                            </multiselect>
                                            <pre v-if="general.bundling.length > 0">
Bundling List :
<template v-for="data in general.bundling">- {{ data.itemName }}
</template>
</pre>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Finance">
                            {{ inventory }}
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <b-form-group label="Kode Akun" label-for="itemCat"
                                        invalid-feedback="Anda Harus Memilih Kode Akun!" :state="typeState">
                                        <multiselect id="itemCat" v-model="type" :options="optionsCoa"
                                            placeholder="Select one" :taggable="false" :multiple="false" track-by="_id"
                                            :show-labels="false" :custom-label="customLabel" :allow-empty="required">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Standart HPP" label-for="financeHPP">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="financeHPP"
                                                v-model="finance.standartHPP" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Standar Jasa" label-for="financeJasa">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="financeJasa"
                                                v-model="finance.standartLabour" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Default UM" label-for="itemSatuan"
                                        invalid-feedback="Anda Harus Memilih Satuan!" :state="dateState">
                                        <multiselect id="itemSatuan" v-model="finance.itemUm" :options="optionsUm"
                                            placeholder="Pilih Default UM" :taggable="true" @tag="addConvert2"
                                            :multiple="false" :allow-empty="required">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Harga Jual (Default Price)" label-for="itemPrice"
                                        invalid-feedback="Harga Item Harus Diisi!" :state="priceState">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="itemPrice" v-model="price"
                                                :state="priceState" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>

                                <div class="col-md-4 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Topping/Add-Ons</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addTopping class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Topping/Add-Ons">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showTopping" @click="showTopping = !showTopping" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showTopping = !showTopping" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showTopping" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Harga</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(topping, i) in optionTopping" :key="i">
                                                <td>{{ topping.name.itemName }}</td>
                                                <td>{{ topping.price }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(topping, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Edit Price -->
                                <div class="col-md-8 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Master Harga</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addPrice class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Master Harga">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showPrice" @click="showPrice = !showPrice" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showPrice = !showPrice" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showPrice" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Harga</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(price, i) in optionAdd" :key="i">
                                                <template v-if="price.name !== 'Default'">
                                                    <td class="align-top">{{ price.name }}</td>
                                                    <td>
                                                        <p class="m-0" v-for="data in price.masterPrice">{{ data.priceQty }}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p class="m-0" v-for="data in price.masterPrice">{{ data.priceValue
                                                        }}
                                                        </p>
                                                    </td>
                                                    <td class="text-center align-top">
                                                        <button type="button" class="btn p-0"
                                                            @click="editPrice(price, i, $event.target)">
                                                            <i class="bi bi-pencil-square text-warning"></i>
                                                        </button>
                                                        <button type="button" class="btn p-0"
                                                            @click="removeData(i, 'optionAdd')">
                                                            <i class="bi bi-trash text-danger"></i>
                                                        </button>
                                                    </td>
                                                </template>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- end modal price -->

                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                        <span class="text-white m-0">Diskon</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addDiskon class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Diskon" disabled>
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showDiskon" @click="showDiskon = !showDiskon" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showDiskon = !showDiskon" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showDiskon" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Tipe</th>
                                                <th scope="col">Nominal</th>
                                                <th scope="col">Tgl. Mulai</th>
                                                <th scope="col">Tgl. Selesai</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(diskon, i) in optionDiskon" :key="i">
                                                <td>{{ diskon.diskonQty }}</td>
                                                <td>{{ diskon.diskonType }}</td>
                                                <td>{{ diskon.diskonValue }}</td>
                                                <td>{{ diskon.diskonStartDate }}</td>
                                                <td>{{ diskon.diskonEndDate }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(diskon, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Pajak</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addTax class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Pajak" disabled>
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showTax" @click="showTax = !showTax" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Hide">
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
                                                <th scope="col">Jumlah</th>
                                                <th scope="col">Tgl.Mulai</th>
                                                <th scope="col">Tgl. Selesai</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(tax, i) in optionTax" :key="i">
                                                <td>{{ tax.taxName }}</td>
                                                <td>{{ tax.taxQty }}</td>
                                                <td>{{ tax.taxStartDate }}</td>
                                                <td>{{ tax.taxEndDate }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(tax, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Inventory">
                            <div class="row">
                                <!-- default location po receipt -->
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="PO receipt" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect id="itemJenis" v-model="inventory.poReceipt" :options="optionsLocation"
                                            placeholder="Lokasi Default PO receipt" :multiple="false"
                                            :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <!-- default location wo receipt -->
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="WO receipt" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect id="itemJenis" v-model="inventory.woReceipt" :options="optionsLocation"
                                            placeholder="Lokasi Default WO receipt" :multiple="false"
                                            :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <!-- unit konversi -->
                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                        <span class="text-white m-0">Unit Konversi</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addConvert class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Unit Konversi">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showConvert" @click="showConvert = !showConvert" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showConvert = !showConvert" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showConvert" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">*Qty. Awal</th>
                                                <th scope="col">*UM. Awal</th>
                                                <th scope="col">*Qty. Konversi</th>
                                                <th scope="col">*UM. Konversi</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(convert, i) in optionConvert" :key="i">
                                                <td>{{ convert.qtyA }}</td>
                                                <td>{{ convert.umA }}</td>
                                                <td>{{ convert.qtyB }}</td>
                                                <td>{{ convert.umB }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editConvert(convert, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0"
                                                        @click="removeData(i, 'optionConvert')">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                </form>
            </b-modal>
            <b-modal :id="detailProc.id" :size="size" :title="detailProc.title" no-close-on-esc no-close-on-backdrop
                hide-header-close @hide="resetAllIndex">
                <form v-if="priceIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleEditPrice">
                    <div class="col-4 d-flex align-items-center justify-content-between">
                        <h4 class="m-0">
                            Nama price
                        </h4>
                        <h3>:</h3>
                    </div>

                    <div class="col-md-8 my-1">
                        <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="titleState">
                            <b-form-input id="toppName" v-model="title" :state="titleState" required
                                disabled></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Harga</h5>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showPrice" class="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Jumlah (Qty)</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(price, i) in arrBlank" :key="i">
                                    <td>
                                        <b-form-group>
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                type="number" id="priceValue" v-model="price.priceQty" required disabled
                                                :class="price.priceQty === '' ? 'is-invalid' : ''"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-input-group prepend="Rp.">
                                                <input v-format-number class="form-control"
                                                    :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                    id="priceValue" v-model="price.priceValue" required disabled
                                                    :class="price.priceValue === '' ? 'is-invalid' : ''">
                                            </b-input-group>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="price.priceStartDate === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="price.priceStartDate === '' ? false : null">
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                type="date" id="priceQTY" v-model="price.priceStartDate" disabled
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                disabled type="date" id="priceQTY"
                                                v-model="price.priceEndDate"></b-form-input>
                                        </b-form-group>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <form ref="form" class="row" v-else-if="convertIndex !== ''" @submit.stop.prevent="handleEditConvert">
                    <div class="col-6 my-2">
                        <b-form-group label="*Qty. Awal">
                            <b-form-input type="number" id="convertQtyA" v-model="arrBlank.qtyA" required disabled
                                :state="arrBlank.qtyA === null ? false : null"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-6 my-2">
                        <b-form-group label="*UM. Awal">
                            <multiselect id="itemUmA" v-model="arrBlank.umA" :options="optionsUm" placeholder="Pilih UM"
                                :show-labels="false" :taggable="true" @tag="addConvert1" :multiple="false" disabled
                                :allow-empty="required" :class="arrBlank.qtyA === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                    <div class="col-6">
                        <b-form-group label="*QTY. Akhir">
                            <b-form-input type="number" id="convertQtyB" v-model="arrBlank.qtyB" required disabled
                                :state="arrBlank.qtyB === null ? false : null"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-6">
                        <b-form-group label="*UM. Akhir">
                            <multiselect id="itemUmA" v-model="arrBlank.umB" :options="optionsUm" placeholder="Pilih UM"
                                :show-labels="false" :taggable="true" @tag="addConvert1" :multiple="false" disabled
                                :allow-empty="required" :class="arrBlank.qtyB === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                </form>
                <form v-else>
                    tesa
                </form>
                <template #modal-footer>
                    <b-button variant="secondary" @click="resetDetailModal">Kembali</b-button>
                </template>
            </b-modal>
            <b-modal :id="editProc.id" :size="size" :title="editProc.title" no-close-on-esc no-close-on-backdrop
                hide-header-close @hide="resetAllIndex">
                <form v-if="priceIndex !== ''" ref="form" class="row" @submit.stop.prevent="handleEditPrice">
                    <div class="col-4 d-flex align-items-center justify-content-between">
                        <h4 class="m-0">
                            Nama price
                        </h4>
                        <h3>:</h3>
                    </div>

                    <div class="col-md-8 my-1">
                        <b-form-group label-for="toppName" invalid-feedback="Nama Harus Diisi!" :state="titleState">
                            <b-form-input id="toppName" v-model="title" :state="titleState" required
                                :disabled="optionPrice.length === 0 && optionAdd.length === 0"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Harga</h5>
                        <button class="btn btn-primary btn-sm" type="button"
                            :class="optionPrice.length === 0 && optionAdd.length === 0 ? 'd-none' : ''"
                            :disabled="title == ''" @click="addRowPrice">Tambah Baris</button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showPrice" class="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Jumlah (Qty)</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th class="text-center"
                                        :class="optionPrice.length === 0 && optionAdd.length === 0 ? 'd-none' : ''">Opsi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(price, i) in arrBlank" :key="i">
                                    <td>
                                        <b-form-group>
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                type="number" id="priceValue" v-model="price.priceQty" required
                                                :class="price.priceQty === '' ? 'is-invalid' : ''"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-input-group prepend="Rp.">
                                                <input v-format-number class="form-control"
                                                    :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                    id="priceValue" v-model="price.priceValue" required
                                                    :class="price.priceValue === '' ? 'is-invalid' : ''">
                                            </b-input-group>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="price.priceStartDate === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="price.priceStartDate === '' ? false : null">
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                type="date" id="priceQTY" v-model="price.priceStartDate"
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input :disabled="optionPrice.length === 0 && optionAdd.length === 0"
                                                type="date" id="priceQTY" v-model="price.priceEndDate"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2"
                                            :class="optionPrice.length === 0 && optionAdd.length === 0 ? 'd-none' : ''"
                                            @click="removeRowPrice(i)">
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
                <form ref="form" class="row" v-else-if="convertIndex !== ''" @submit.stop.prevent="handleEditConvert">
                    <div class="col-6 my-2">
                        <b-form-group label="*Qty. Awal">
                            <b-form-input type="number" id="convertQtyA" v-model="arrBlank.qtyA" required
                                :state="arrBlank.qtyA === null ? false : null"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-6 my-2">
                        <b-form-group label="*UM. Awal">
                            <multiselect id="itemUmA" v-model="arrBlank.umA" :options="optionsUm" placeholder="Pilih UM"
                                :show-labels="false" :taggable="true" @tag="addConvert1" :multiple="false"
                                :allow-empty="required" :class="arrBlank.qtyA === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                    <div class="col-6">
                        <b-form-group label="*QTY. Akhir">
                            <b-form-input type="number" id="convertQtyB" v-model="arrBlank.qtyB" required
                                :state="arrBlank.qtyB === null ? false : null"></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-6">
                        <b-form-group label="*UM. Akhir">
                            <multiselect id="itemUmA" v-model="arrBlank.umB" :options="optionsUm" placeholder="Pilih UM"
                                :show-labels="false" :taggable="true" @tag="addConvert1" :multiple="false"
                                :allow-empty="required" :class="arrBlank.qtyB === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                </form>
                <form v-else>
                    tesa
                </form>
                <template #modal-footer v-if="priceIndex !== ''">
                    <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                    <b-button type="submit" variant="success" @click="submitEditPrice"
                        :disabled="title === ''">Edit</b-button>
                </template>
                <template #modal-footer v-else-if="convertIndex !== ''">
                    <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                    <b-button type="submit" variant="success" @click="submitEditConvert">Edit</b-button>
                </template>
                <template #modal-footer v-else>
                    <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                </template>
            </b-modal>
            <b-modal id="modal-add" size="lg" title="Tambah Item" no-close-on-esc no-close-on-backdrop ref="modal"
                @show="resetModal" @hidden="resetModal" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-tabs class=" custom-tabs" content-class="mt-3 px-5" card>
                        <b-tab title="General" active>
                            <div class="row">
                                <div class="col-md-3 d-flex justify-content-center">
                                    <label class="avatar avatar-xxl avatar-circle avatar-uploader profile-cover-avatar"
                                        for="addImage" @change="(event) => previewFiles(event)" tabindex="-1"
                                        invalid-feedback="Provinsi Harus Diisi!" :state="imageState" style="margin: 0">
                                        <img v-if="general.image !== ''" id="editAvatarImgModal" class="avatar-img"
                                            :src="general.image" alt="Image Description" />
                                        <img v-else id="editAvatarImgModal" class="avatar-img"
                                            src="assets/img/160x160/img0.jpg" alt="Image Description">
                                        <input tabindex="-1" type="file" class="js-file-attach avatar-uploader-input"
                                            id="addImage" :state="imageState" required>
                                        <span class="avatar-uploader-trigger">
                                            <i class="bi-pencil-fill avatar-uploader-icon shadow-sm"></i>
                                        </span>
                                    </label>
                                </div>

                                <div class="row col-md-9">
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Kode (Barcode)" label-for="itemCode"
                                            invalid-feedback="Kode Item Harus Diisi!" :state="groupState">
                                            <b-form-input id="itemCode" v-model="group" :state="groupState" required
                                                placeholder="Kode Item (Barcode)"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Nama" label-for="itemName"
                                            invalid-feedback="Nama Item Harus Diisi!" :state="NameState">
                                            <b-form-input id="itemName" v-model="name" :state="NameState" required
                                                placeholder="Nama Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Deskripsi (Spec)" label-for="itemDefStatus"
                                            invalid-feedback="Deskripsi Harus Diisi!" :state="descState">
                                            <b-form-input id="itemDefStatus" v-model="desc" :state="descState" required
                                                placeholder="Deskripsi Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Merk" label-for="itemAddMerk"
                                            invalid-feedback="Tipe Item Harus Diisi!">
                                            <b-form-input id="itemAddMerk" v-model="general.merk" required
                                                placeholder="Merk Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Tipe" label-for="itemAddType"
                                            invalid-feedback="Tipe Item Harus Diisi!">
                                            <b-form-input id="itemAddType" v-model="general.type" required
                                                placeholder="Tipe Item"></b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <!-- <b-form-group label="No. Seri" label-for="itemAddNoSeri"
                                                    invalid-feedback="Tipe Item Harus Diisi!">
                                                    <b-form-input id="itemAddNoSeri" v-model="general.noSeri"
                                                        required placeholder="Nomor Seri Item"></b-form-input>
                                                </b-form-group> -->
                                    </div>
                                    <div class="col-md-12">
                                        <hr class="my-2">
                                    </div>
                                    <div class="col-md-6  mb-2">
                                        <b-form-group label="Kategori" label-for="itemCat"
                                            invalid-feedback="Kategori Item Harus Diisi!" :state="katState">
                                            <multiselect id="itemCat" v-model="kat" :options="optionsCategory"
                                                placeholder="Pilih Kategori" :taggable="true" @tag="addCategory"
                                                :multiple="false" :allow-empty="required" :show-labels="false">
                                            </multiselect>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Jenis" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect id="itemJenis" v-model="general.jenis" :options="optionsJenis"
                                                placeholder="Pilih Jenis" :multiple="false" :allow-empty="required"
                                                :show-labels="false">
                                            </multiselect>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Grup" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect v-model="general.group" :options="optionsGroup" :multiple="true"
                                                :clear-on-select="false" :preserve-search="true"
                                                :class="general.group === null ? 'invalid' : ''" placeholder="Pilih Grup">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                            values.length }} data dipilih</span>
                                                </template>
                                            </multiselect>
                                            <template v-if="general.group">
                                                <pre v-if="general.group.length > 0">
Grup List :
<template v-for="data in general.group">- {{ data }}
</template>
</pre>
                                            </template>
                                        </b-form-group>
                                    </div>
                                    <div class="col-md-6 mb-2">
                                        <b-form-group label="Bundling" label-for="itemJenis"
                                            invalid-feedback="Jenis Item Harus Diisi!">
                                            <multiselect v-model="general.bundling" :options="usaha" label="itemName"
                                                :multiple="true" :clear-on-select="false" :preserve-search="true"
                                                placeholder="Item Bundling" track-by="_id">
                                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span
                                                        class="multiselect__single" v-if="values.length" v-show="!isOpen">{{
                                                            values.length }} data dipilih</span>
                                                </template>
                                            </multiselect>
                                            <pre v-if="general.bundling.length > 0">
Bundling List :
<template v-for="data in general.bundling">- {{ data.itemName }}
</template>
</pre>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Finance">
                            <div class="row">
                                <div class="col-md-12 mb-2">
                                    <b-form-group label="Kode Akun" label-for="itemCat"
                                        invalid-feedback="Anda Harus Memilih Kode Akun!" :state="typeState">
                                        <multiselect id="itemCat" v-model="type" :options="optionsCoa"
                                            placeholder="Select one" :taggable="false" :multiple="false" track-by="_id"
                                            :show-labels="false" :custom-label="customLabel" :allow-empty="required">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Standart HPP" label-for="financeHPP">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="financeHPP"
                                                v-model="finance.standartHPP" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Standar Jasa" label-for="financeJasa">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="financeJasa"
                                                v-model="finance.standartLabour" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Default UM" label-for="itemSatuan"
                                        invalid-feedback="Anda Harus Memilih Satuan!" :state="dateState">
                                        <multiselect id="itemSatuan" v-model="finance.itemUm" :options="optionsUm"
                                            placeholder="Pilih Default UM" :taggable="true" @tag="addConvert2"
                                            :multiple="false" :allow-empty="required">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Harga Jual (Default Price)" label-for="itemPrice"
                                        invalid-feedback="Harga Item Harus Diisi!" :state="priceState">
                                        <b-input-group prepend="Rp.">
                                            <input v-format-number class="form-control" id="itemPrice" v-model="price"
                                                :state="priceState" required placeholder="100,000"></input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>

                                <div class="col-md-4 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Topping/Add-Ons</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addTopping class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Topping/Add-Ons">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showTopping" @click="showTopping = !showTopping" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showTopping = !showTopping" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showTopping" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Harga</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(topping, i) in optionTopping" :key="i">
                                                <td>{{ topping.name.itemName }}</td>
                                                <td>{{ topping.price }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(topping, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <!-- Modal Price -->
                                <div class="col-md-8 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Master Harga</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addPrice class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Master Harga">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showPrice" @click="showPrice = !showPrice" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showPrice = !showPrice" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showPrice" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Nama</th>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Harga</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(price, i) in optionAdd" :key="i">
                                                <td class="align-top">{{ price.name }}</td>
                                                <td>
                                                    <p class="m-0" v-for="data in price.masterPrice">{{ data.priceQty }}</p>
                                                </td>
                                                <td>
                                                    <p class="m-0" v-for="data in price.masterPrice">{{ data.priceValue }}
                                                    </p>
                                                </td>
                                                <td class="text-center align-top">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(price, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0"
                                                        @click="removeData(i, 'optionAdd')">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- end modal price -->

                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                        <span class="text-white m-0">Diskon</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addDiskon class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Diskon" disabled>
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showDiskon" @click="showDiskon = !showDiskon" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showDiskon = !showDiskon" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showDiskon" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Qty</th>
                                                <th scope="col">Tipe</th>
                                                <th scope="col">Nominal</th>
                                                <th scope="col">Tgl. Mulai</th>
                                                <th scope="col">Tgl. Selesai</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(diskon, i) in optionDiskon" :key="i">
                                                <td>{{ diskon.diskonQty }}</td>
                                                <td>{{ diskon.diskonType }}</td>
                                                <td>{{ diskon.diskonValue }}</td>
                                                <td>{{ diskon.diskonStartDate }}</td>
                                                <td>{{ diskon.diskonEndDate }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(diskon, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Pajak</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addTax class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Pajak" disabled>
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showTax" @click="showTax = !showTax" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Hide">
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
                                                <th scope="col">Jumlah</th>
                                                <th scope="col">Tgl.Mulai</th>
                                                <th scope="col">Tgl. Selesai</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(tax, i) in optionTax" :key="i">
                                                <td>{{ tax.taxName }}</td>
                                                <td>{{ tax.taxQty }}</td>
                                                <td>{{ tax.taxStartDate }}</td>
                                                <td>{{ tax.taxEndDate }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editPrice(tax, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0" @click="removeData(i)">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-tab>
                        <b-tab title="Inventory">
                            <div class="row">
                                <!-- default location po receipt -->
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="PO receipt" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect id="itemJenis" v-model="inventory.poReceipt" :options="optionsLocation"
                                            placeholder="Lokasi Default PO receipt" :multiple="false"
                                            :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <!-- default location wo receipt -->
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="WO receipt" label-for="itemJenis"
                                        invalid-feedback="Jenis Item Harus Diisi!">
                                        <multiselect id="itemJenis" v-model="inventory.woReceipt" :options="optionsLocation"
                                            placeholder="Lokasi Default WO receipt" :multiple="false"
                                            :allow-empty="required" :show-labels="false" :custom-label="labelLocation">
                                        </multiselect>
                                    </b-form-group>
                                </div>
                                <!-- unit konversi -->
                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center bg-primary">
                                        <span class="text-white m-0">Unit Konversi</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addConvert class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Unit Konversi">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showConvert" @click="showConvert = !showConvert" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showConvert = !showConvert" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showConvert" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">*Qty. Awal</th>
                                                <th scope="col">*UM. Awal</th>
                                                <th scope="col">*Qty. Konversi</th>
                                                <th scope="col">*UM. Konversi</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(convert, i) in optionConvert" :key="i">
                                                <td>{{ convert.qtyA }}</td>
                                                <td>{{ convert.umA }}</td>
                                                <td>{{ convert.qtyB }}</td>
                                                <td>{{ convert.umB }}</td>
                                                <td class="text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editConvert(convert, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>
                                                    <button type="button" class="btn p-0"
                                                        @click="removeData(i, 'optionConvert')">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </b-tab>
                    </b-tabs>
                    <!-- <div class="col-md-6 mb-2">
                                    <b-form-group
                                    label="Lot Number"
                                    label-for="itemLotNumber"
                                    invalid-feedback="Lot Number Harus Diisi!"
                                    >
                                    <b-form-input
                                        type="number"
                                        id="itemLotNumber"
                                        v-model="lot"
                                        required
                                    ></b-form-input>
                                    </b-form-group>
                            </div>
                            <div class="col-md-6 mb-2">
                                    <b-form-group
                                    label="Batch Number"
                                    label-for="itemBatchNumber"
                                    invalid-feedback="Batch Number Harus Diisi!"
                                    :state="batchState"
                                    >
                                    <b-form-input
                                        type="number"
                                        id="itemBatchNumber"
                                        v-model="batch"
                                        :state="batchState"
                                        required
                                    ></b-form-input>
                                    </b-form-group>
                            </div> -->
                    <!-- <div class="col-md-4 mb-2">
                                    <b-form-group
                                    label="Konversi"
                                    label-for="itemConvert"
                                    invalid-feedback="Anda Harus Memilih Unit Konversi!"
                                    :state="imageState"
                                    >
                                <multiselect 
                                    id="itemConvert"
                                    v-model="image" 
                                    :options="optionsUm" 
                                    placeholder="Select" 
                                    :taggable="true"
                                    @tag="addConvert2"
                                    :multiple="false"
                                    track-by="name" 
                                    label="name"
                                    :allow-empty="required">
                                </multiselect>
                                    </b-form-group>
                            </div> -->
                </form>
            </b-modal>
            <!-- modal price -->
            <b-modal id="modal-addPrice" size="lg" title="Tambah Master Harga" hide-header-close no-close-on-esc
                no-close-on-backdrop ref="modal" :ok-disabled="arrBlank.length === 0" @hidden="resetAddModal"
                @ok="handleOkPrice">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitPrice">
                    <div class="col-md-12 mb-2">
                        <b-form-group label="Nama Master Harga" label-for="priceName"
                            invalid-feedback="Nama Master Harga Harus Diisi!" :state="titleState">
                            <b-form-input id="priceName" v-model="title" :state="titleState" required></b-form-input>
                        </b-form-group>
                    </div>
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Harga</h5>
                        <button class="btn btn-primary btn-sm" type="button" :disabled="title == ''"
                            @click="addRowPrice">Tambah Baris</button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showPrice" class="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Jumlah (Qty)</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(price, i) in arrBlank" :key="i">
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="number" id="priceValue" v-model="price.priceQty" required
                                                :state="price.priceQty === null ? false : null"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-input-group prepend="Rp.">
                                                <input v-format-number class="form-control" id="priceValue"
                                                    v-model="price.priceValue" required
                                                    :class="price.priceQty === null ? 'is-invalid' : ''">
                                            </b-input-group>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="price.priceStartDate === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="price.priceStartDate === '' ? false : null">
                                            <b-form-input type="date" id="priceQTY" v-model="price.priceStartDate"
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="date" id="priceQTY" v-model="price.priceEndDate"
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2" @click="removeRowPrice(i)">
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </b-modal>
            <b-modal id="modal-addTopping" size="sm" title="Tambah Topping/Add-Ons" hide-header-close no-close-on-esc
                no-close-on-backdrop ref="modal" @hidden="resetAddTopping" @ok="handleOkTopping">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitTopping">
                    <div class="col-md-12 mb-2">
                        <b-form-group label="*Nama" label-for="toppingName" invalid-feedback="Nama Topping Harus Diisi!"
                            :state="modalTopping.titleState">

                            <multiselect id="itemJenis" v-model="modalTopping.name" :options="optionsAddOns"
                                placeholder="Pilih Nama Topping/Add-Ons" :multiple="false" :allow-empty="required"
                                :show-labels="false" label="itemName">
                            </multiselect>
                        </b-form-group>
                    </div>
                    <div class="col-md-12 mb-2">
                        <b-form-group label="*Harga" label-for="toppingPrice" invalid-feedback="Harga Harus Diisi!"
                            :state="modalTopping.priceState">
                            <b-input-group prepend="Rp.">
                                <input v-format-number class="form-control" placeholder="100.000" id="toppingPrice"
                                    v-model="modalTopping.price" :state="modalTopping.priceState" required>
                            </b-input-group>
                        </b-form-group>
                    </div>
                </form>
            </b-modal>

            <b-modal id="modal-addDiskon" size="lg" title="Tambah Diskon Untuk Promo per Item (Contoh: Promo Ramadhan)"
                hide-header-close no-close-on-esc no-close-on-backdrop ref="modal" :ok-disabled="arrBlank.length === 0"
                @hidden="resetAddModal" @ok="handleOkDiskon">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitDiskon">
                    <!-- Updated the form submit handler -->
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Diskon</h5> <!-- Updated the heading -->
                        <button class="btn btn-primary btn-sm" type="button" @click="addRowDiskon">
                            Tambah Baris Diskon
                        </button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showDiskon" class="table border">
                            <!-- Updated the table heading and v-if condition -->
                            <thead>
                                <tr>
                                    <th scope="col">Kode</th>
                                    <th scope="col">Qty Diskon</th>
                                    <th scope="col">Diskon</th> <!-- Updated the table header -->
                                    <th scope="col">Nominal</th> <!-- Updated the table header -->
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(diskon, i) in arrBlank" :key="i"> <!-- Updated the variable name -->
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="diskon.codeDiscount === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="diskon.codeDiscount === '' ? false : null">
                                            <b-form-input id="diskonCode" v-model="diskon.codeDiscount" class="px-2"
                                                required></b-form-input> <!-- Updated the variable name -->
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="diskon.diskonQty === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="diskon.diskonQty === '' ? false : null">
                                            <b-form-input type="number" id="diskonValue" v-model="diskon.diskonQty" required
                                                class="px-2" style="width: 60px"></b-form-input>
                                            <!-- Updated the variable name -->
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="diskon.diskonType === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="diskon.diskonType === '' ? false : null">
                                            <multiselect v-model="diskon.diskonType" :options="optionsPriceType"
                                                placeholder="Pilih" :show-labels="false" :allow-empty="required"
                                                style="max-width: 100px">
                                            </multiselect>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="diskon.diskonValue === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="diskon.diskonValue === '' ? false : null">
                                            <b-input-group prepend="Rp.">
                                                <b-form-input type="number" id="diskonValue" v-model="diskon.diskonValue"
                                                    required class="px-2"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="diskon.diskonStartDate === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="diskon.diskonStartDate === '' ? false : null">
                                            <b-form-input type="date" id="diskonQTY" v-model="diskon.diskonStartDate"
                                                required class="px-2" style="width: 125px"></b-form-input>
                                            <!-- Updated the variable name -->
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="date" id="diskonQTY" v-model="diskon.diskonEndDate" required
                                                class="px-2" style="width: 125px"></b-form-input>
                                            <!-- Updated the variable name -->
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2" @click="removeRowDiskon(i)">
                                            <!-- Updated the variable name -->
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </b-modal>
            <b-modal id="modal-addTax" size="lg" title="Tambah Tipe Pajak" hide-header-close no-close-on-esc
                no-close-on-backdrop ref="modal" :ok-disabled="arrBlank.length === 0" @hidden="resetAddModal"
                @ok="handleOkTax">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitTax">
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Pajak</h5>
                        <button class="btn btn-primary btn-sm" type="button" @click="addRowTax">
                            Tambah Baris
                        </button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showTax" class="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Jumlah</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(tax, i) in arrBlank" :key="i">
                                    <td>
                                        <b-form-group :invalid-feedback="tax.taxName === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="tax.taxName === '' ? false : null">
                                            <b-form-input id="taxName" v-model="tax.taxName" required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group :invalid-feedback="tax.taxValue === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="tax.taxValue === '' ? false : null">
                                            <b-input-group append="%">
                                                <b-form-input type="number" id="taxValue" v-model="tax.taxValue" required
                                                    min="0" max="100"></b-form-input>
                                            </b-input-group>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group
                                            :invalid-feedback="tax.taxStartDate === '' ? 'Tidak Boleh Kosong!' : null"
                                            :state="tax.taxStartDate === '' ? false : null">
                                            <b-form-input type="date" id="taxQTY" v-model="tax.taxStartDate"
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="date" id="taxQTY" v-model="tax.taxEndDate"
                                                required></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2" @click="removeRowTax(i)">
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </b-modal>
            <b-modal id="modal-addConvert" size="lg" title="Tambah Tipe Convert" hide-header-close no-close-on-esc
                no-close-on-backdrop ref="modal" :ok-disabled="arrBlank.length === 0" @hidden="resetAddModal"
                @ok="handleOkConvert">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitConvert">
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Convert</h5>
                        <button class="btn btn-primary btn-sm" type="button" @click="addRowConvert">
                            Tambah Baris
                        </button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showConvert" class="table border">
                            <thead>
                                <tr>
                                    <th scope="col">Qty. Awal</th>
                                    <th scope="col">UM. Awal</th>
                                    <th scope="col">Qty. Konversi</th>
                                    <th scope="col">UM. Konversi</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(convert, i) in arrBlank" :key="i">
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="number" id="convertQtyA" v-model="convert.qtyA" required
                                                :state="convert.qtyA === null ? false : null"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <multiselect id="itemUmA" v-model="convert.umA" :options="optionsUm"
                                                placeholder="Pilih UM" :show-labels="false" :taggable="true"
                                                @tag="addConvert1" :multiple="false" :allow-empty="required"
                                                :class="convert.qtyA === null ? 'invalid' : ''">
                                            </multiselect>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <b-form-input type="number" id="convertQtyB" v-model="convert.qtyB" required
                                                :state="convert.qtyB === null ? false : null"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <multiselect id="itemUmA" v-model="convert.umB" :options="optionsUm"
                                                placeholder="Pilih UM" :show-labels="false" :taggable="true"
                                                @tag="addConvert1" :multiple="false" :allow-empty="required"
                                                :class="convert.qtyB === null ? 'invalid' : ''">
                                            </multiselect>
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2" @click="removeRowConvert(i)">
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </b-modal>
            <b-modal id="modal-addRecipe" size="lg" title="Tambah Tipe Resep" hide-header-close no-close-on-esc
                no-close-on-backdrop ref="modal" :ok-disabled="arrBlank.length === 0" @hidden="resetAddRecipe"
                @ok="handleOkRecipe">
                <form ref="form" class="row" @submit.stop.prevent="handleSubmitRecipe">
                    <div class="col-md-6 mb-2">
                        <b-form-group label="*Kode Proses">
                            <b-form-input id="recipeCode" v-model="modalRecipe.processCode" required
                                placeholder="Masukan Kode Proses"
                                :state="modalRecipe.processCode === null ? false : null"></b-form-input>

                            <!-- Updated the variable name -->
                        </b-form-group>
                    </div>
                    <div class="col-md-6 mb-2">
                        <b-form-group label="*Nama Proses">
                            <b-form-input id="recipeName" v-model="modalRecipe.processName" required
                                placeholder="Masukan Nama Proses"
                                :state="modalRecipe.processName === null ? false : null"></b-form-input>

                            <!-- Updated the variable name -->
                        </b-form-group>
                    </div>
                    <div class="col-md-4 mb-2">
                        <b-form-group label="*Qty Resep">
                            <b-form-input type="number" id="recipeQty" v-model="modalRecipe.recipeQty" required
                                placeholder="Kuantitas yg dihasilkan resep"
                                :state="modalRecipe.recipeQty === null ? false : null"></b-form-input>
                            <!-- Updated the variable name -->
                        </b-form-group>
                    </div>
                    <div class="col-md-4 mb-2">
                        <b-form-group label="*UM Resep">
                            <multiselect id="itemUm" v-model="modalRecipe.recipeUM" :options="optionsUm"
                                placeholder="Pilih UM" :show-labels="true" :taggable="true" @tag="addConvert3"
                                :multiple="false" :allow-empty="required"
                                :class="modalRecipe.recipeUM === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                    <div class="col-md-4 mb-2">
                        <b-form-group label="*Hasil Resep">
                            <multiselect id="itemUm" v-model="modalRecipe.recipeItemResult" :options="optionsHasil"
                                placeholder="Hasil yg dihasilkan" :show-labels="false" :custom-label="customLabel1"
                                :multiple="false" :allow-empty="required"
                                :class="modalRecipe.recipeItemResult === null ? 'invalid' : ''">
                            </multiselect>
                        </b-form-group>
                    </div>
                    <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                        <h5>List Material Resep</h5>
                        <button class="btn btn-primary btn-sm" type="button" @click="addRowRecipe">
                            Tambah Material
                        </button>
                    </div>
                    <div class="col-md-12">
                        <table v-if="showRecipe" class="table border">
                            <thead>
                                <tr>
                                    <th class="text-center" scope="col">*Nama Item</th>
                                    <th class="text-center">&</th>
                                    <th class="text-center" scope="col">Kode Item</th>
                                    <th class="text-center" scope="col">Deskripsi</th>
                                    <th class="text-center" scope="col">*UM</th>
                                    <th class="text-center" scope="col">*Qty</th>
                                    <th class="text-center">Opsi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(recipe, i) in arrBlank" :key="i">
                                    <td colspan="3">
                                        <b-form-group>
                                            <multiselect id="recipeCode" v-model="recipe.itemCode"
                                                :options="optionsMaterial" placeholder="Select one" :taggable="false"
                                                :multiple="false" :show-labels="false" :custom-label="customLabel1"
                                                :allow-empty="required" @input="changeUM(recipe, i)"
                                                :class="recipe.itemCode === null ? 'invalid' : ''">
                                            </multiselect>
                                        </b-form-group>
                                    </td>
                                    <td style="width: 175px">
                                        <b-form-group>
                                            <b-form-input id="itemDescription" v-model="recipe.itemDescription" required
                                                class="px-2"
                                                :state="recipe.itemDescription === null ? false : null"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td>
                                        <b-form-group>
                                            <multiselect id="itemUmA" v-model="recipe.itemUM" :options="optionsUm"
                                                placeholder="Pilih" :show-labels="false" :taggable="true"
                                                @tag="addConvert4(i, $event)" :multiple="false" :allow-empty="required"
                                                :class="recipe.itemUM === null ? 'invalid' : ''">
                                            </multiselect>
                                        </b-form-group>
                                    </td>
                                    <td style="width: 100px">
                                        <b-form-group>
                                            <b-form-input type="number" id="qty" v-model="recipe.qty" required
                                                :state="recipe.qty === null ? false : null"></b-form-input>
                                        </b-form-group>
                                    </td>
                                    <td class="text-center">
                                        <button type="button" class="btn p-0 py-2" @click="removeRowRecipe(i)">
                                            <i class="bi bi-trash text-danger"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </form>
            </b-modal>
            <!-- end modal price -->
            <b-row class="my-4">
                <b-col sm="5" md="6" class="my-1">
                    <span class="px-2">Show</span>
                    <b-form-select id="per-page-select" v-model="perPage" :options="pageOptions" size="sm"></b-form-select>
                    Data of {{ totalRows }} Data
                </b-col>
                <b-col sm="7" md="6" class="my-1">
                    <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" align="fill" size="sm"
                        class="my-0"></b-pagination>
                </b-col>
            </b-row>
        </div>
        </div>
    </main>
</template>
  
<script>
import axios from "axios";
import { getItem, getItemDetail, addItems, updateItem, getCoa, get5, get6, get7, getN, getDataDistinc, getListArrItem } from '../components/services/components'
import { getFullDate } from '../components/function/date'
import { getUsaha, addMicro, updateUsaha, updateProc, updateMicro } from "./services/usaha";
export default {
    props: ['itemDomain'],
    data() {
        return {
            size: 'lg',
            currentDate: '',

            showTopping: true,
            showPrice: true,
            showDiskon: true,
            showTax: true,
            showRecipe: true,
            showConvert: true,

            toppingIndex: '',
            priceIndex: '',
            diskonIndex: '',
            taxIndex: '',
            recipeIndex: '',
            convertIndex: '',

            // modal Topping
            optionAdd: [],
            optionPrice: [],
            optionTopping: [],
            optionDiskon: [],
            optionTax: [],
            optionConvert: [],
            optionRecipe: [],

            modalTopping: {
                name: '',
                price: '',
                titleState: null,
                priceState: null,
            },
            modalRecipe: {
                processCode: '',
                processName: '',
                recipeUM: '',
                recipeQty: '',
                recipeItemResult: ''
            },
            // end modal topping

            arrBlank: [],
            listLogo: [],
            dataId: '',
            procId: '',
            microId: '',
            dataIndex: '',
            toppIndex: '',
            totalRows: 1,
            currentPage: 1,
            perPage: 10,
            pageOptions: [10, 15, 25],
            // fields: ['itemCode', 'coa', 'itemName', 'itemCategory', 'itemLocation', 'lotNumber', 'batchNumber', 'satuan', 'convert', 'opsi'],
            fields: ['itemCoA', 'itemCode', 'itemName', 'itemCategory', 'opsi'],
            sorts: [],
            // selected: ['itemCode', 'coa', 'itemName', 'itemCategory', 'itemLocation', 'lotNumber', 'batchNumber', 'satuan', 'convert', 'opsi'],
            selected: ['itemCoA', 'itemCode', 'itemName', 'itemCategory', 'opsi'],
            usaha: [],
            process: [],
            microservice: [],
            filter: '',
            general: {
                image: '',
                jenis: '',
                group: '',
                type: '',
                merk: '',
                noSeri: '',
                bundling: ''
            },
            finance: {
                standartHPP: '',
                standartLabour: '',
                itemUm: '',
                defaultPrice: '',
            },
            inventory: {
                poReceipt: '',
                woReceipt: '',
                formula: '',
                unitConvertion: '',
                minQty: ''

            },
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
                id: 'edit-proc',
                title: '',
                content: ''
            },
            detailProc: {
                id: 'detail-proc',
                title: '',
                content: ''
            },
            optionsJenis: ['barang', 'jasa'],
            optionsPriceType: ['amount', 'percent'],
            optionsGroup: [],
            optionsLocation: [],
            optionsTopping: [],
            optionsAddOns: [],
            optionsCoa: [],
            optionsUm: [],
            optionsMaterial: [],
            optionsHasil: [],

            microCode: '',

            id: '',
            name: '',
            type: '',
            desc: '',
            group: '',
            kat: '',
            price: '',
            date: '',
            image: '',
            batch: '',
            lot: '',

            title: '',

            batchState: null,
            NameState: null,
            typeState: null,
            descState: null,
            groupState: null,
            katState: null,
            titleState: null,
            priceState: null,
            dateState: null,
            imageState: null
        }
    },
    methods: {
        submitEditConvert(event) {
            event.preventDefault();
            this.handleEditConvert();
        },
        handleEditConvert() {
            if (this.arrBlank.qtyA && this.arrBlank.umA && this.arrBlank.qtyB && this.arrBlank.umB) {
                this.optionConvert[this.convertIndex] = this.arrBlank
                this.$swal({
                    icon: 'success',
                    title: 'Harga Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.resetEditModal()
                    this.$bvModal.hide('edit-proc')
                });
            } else {
                alert('Ada data wajib yang masih kosong!')
            }
            if (this.arrBlank.qtyA === '') {
                this.arrBlank.qtyA = null
            }
            if (this.arrBlank.umA === '') {
                this.arrBlank.umA = null
            }
            if (this.arrBlank.qtyB === '') {
                this.arrBlank.qtyB = null
            }
            if (this.arrBlank.umB === '') {
                this.arrBlank.umB = null
            }
        },
        resetAllIndex() {
            this.size = 'lg',
                this.toppingIndex = '',
                this.priceIndex = '',
                this.diskonIndex = '',
                this.taxIndex = '',
                this.recipeIndex = '',
                this.convertIndex = ''
        },
        alertSuccessDelete() {
            this.$swal({
                icon: 'success',
                title: 'Data Berhasil Dihapus!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        alertFailedDelete() {
            this.$swal({
                icon: 'success',
                title: 'Data Gagal Dihapus!',
                showConfirmButton: false,
                timer: 1500
            })
        },
        findValidObject(obj) {
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    if (obj[key] !== '' && obj[key] !== null && obj[key] !== undefined) {
                        return true; // The object is not empty and has non-empty values
                    }
                }
            }
            return false; // The object is either empty or contains only empty values

        },
        changeUM(data, index) {
            if (data.itemCode !== null && data.itemCode !== '' && data.itemCode !== undefined) {
                this.arrBlank[index].itemUM = data.itemCode.itemUM
            } else {
                this.arrBlank[index].itemUM = ''
            }
        },
        // modal recipe
        async addRowRecipe() {
            this.arrBlank.push({
                itemCode: '',
                itemUM: '',
                qty: '',
                itemDescription: ''
            });
        },
        removeRowRecipe(index) {
            this.$swal({
                title: 'Hapus Baris?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Baris terhapus!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.arrBlank.splice(index, 1);
                }
            });
        },

        handleOkRecipe(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitRecipe()
        },
        handleSubmitRecipe() {
            if (this.modalRecipe.processCode && this.modalRecipe.processName && this.modalRecipe.recipeQty && this.findValidObject(this.modalRecipe.recipeUM) && this.findValidObject(this.modalRecipe.recipeItemResult) && this.arrBlank.some(item => this.findValidObject(item.itemCode)) && this.arrBlank.some(item => item.qty !== '')) {
                const data = { ...this.modalRecipe }
                data.recipeMaterial = this.arrBlank.map(x => ({ item: x.itemCode._id, itemCode: x.itemCode.itemCode, itemName: x.itemCode.itemName, UM: x.itemUM, qty: x.qty, itemDescription: x.itemDescription }))
                this.optionRecipe.push(data)
                this.$swal({
                    icon: 'success',
                    title: 'Price Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addRecipe')
                });

            }
            if (this.modalRecipe.processCode === '') {
                this.modalRecipe.processCode = null
            }
            if (this.modalRecipe.processName === '') {
                this.modalRecipe.processName = null
            }
            if (this.modalRecipe.recipeQty === '') {
                this.modalRecipe.recipeQty = null
            }
            if (this.modalRecipe.recipeUM === '') {
                this.modalRecipe.recipeUM = null
            }
            if (this.modalRecipe.recipeItemResult === '') {
                this.modalRecipe.recipeItemResult = null
            }

            this.arrBlank.forEach(x => {
                if (x.itemCode === '') {
                    x.itemCode = null
                }
                if (x.itemUM === '') {
                    x.itemUM = null
                }
                if (x.qty === '') {
                    x.qty = null
                }
            });
        },


        resetAddRecipe() {
            // Reset all properties to their initial values
            this.modalRecipe.processName = '';
            this.modalRecipe.processCode = '';
            this.modalRecipe.recipeUM = '';
            this.modalRecipe.recipeQty = '';
            this.modalRecipe.recipeItemResult = '';
            this.arrBlank = [];
            // Additional resets if needed for other properties
        },
        // end modal recipe

        // modal convert
        async addRowConvert() {
            this.arrBlank.push({
                qtyA: '',
                umA: '',
                qtyB: '',
                umB: '',
            });
        },
        removeRowConvert(index) {
            this.$swal({
                title: 'Hapus Baris?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Baris terhapus!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.arrBlank.splice(index, 1);
                }
            });
        },

        handleOkConvert(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitConvert()
        },
        handleSubmitConvert() {
            if (this.arrBlank.some(item => item.qtyA !== '') && this.arrBlank.some(item => item.umA !== '') && this.arrBlank.some(item => item.qtyB !== '') && this.arrBlank.some(item => item.umB !== '')) {
                this.arrBlank.forEach(data => {
                    this.optionConvert.push(data)
                });
                this.$swal({
                    icon: 'success',
                    title: 'Price Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addConvert')
                });
            }
            this.arrBlank.forEach(x => {
                if (x.qtyA === '') {
                    x.qtyA = null
                }
                if (x.umA === '') {
                    x.umA = null
                }
                if (x.qtyB === '') {
                    x.qtyB = null
                }
                if (x.umB === '') {
                    x.umB = null
                }
            });
        },
        // end modal convert

        // modal tax         
        async addRowTax() {
            this.arrBlank.push({
                taxCode: '',
                taxGroup: '',
                taxName: '',
                taxQty: '',
                taxValue: '',
                taxStartDate: this.currentDate,
                taxEndDate: '',
            });
        },
        removeRowTax(index) {
            this.$swal({
                title: 'Hapus Baris?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Baris terhapus!',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    this.arrBlank.splice(index, 1);
                }
            });
        },

        handleOkTax(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitTax()
        },
        handleSubmitTax() {
            if (this.arrBlank.some(item => item.taxName !== '') && this.arrBlank.some(item => item.taxValue !== '') && this.arrBlank.some(item => item.taxStartDate !== '')) {
                this.arrBlank.forEach(data => {
                    this.optionTax.push(data)
                });
                this.$swal({
                    icon: 'success',
                    title: 'Price Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addTax')
                });
            }
        },
        // end modal tax

        // modal diskon
        async addRowDiskon() { // Updated the method name
            this.arrBlank.push({
                codeDiscount: '', // Updated the variable name
                diskonType: [], // Updated the variable name
                diskonGroup: '', // Updated the variable name
                diskonName: '', // Updated the variable name
                diskonQty: '', // Updated the variable name
                diskonValue: '', // Updated the variable name
                diskonStartDate: this.currentDate, // Updated the variable name
                diskonEndDate: '', // Updated the variable name
            });
        },
        removeRowDiskon(index) { // Updated the method name
            this.$swal({
                title: 'Hapus Baris Diskon?', // Updated the confirmation message
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Baris Diskon terhapus!', // Updated the success message
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.arrBlank.splice(index, 1);
                }
            });
        },


        handleOkDiskon(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitDiskon()
        },
        handleSubmitDiskon() {
            if (this.arrBlank.some(item => item.diskonQty !== '') && this.arrBlank.some(item => item.diskonType.length > 0) && this.arrBlank.some(item => item.diskonValue !== '') && this.arrBlank.some(item => item.diskonStartDate !== '')) {
                this.arrBlank.forEach(data => {
                    this.optionDiskon.push(data)
                });
                this.$swal({
                    icon: 'success',
                    title: 'Price Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addDiskon')
                });
            }
        },
        // end modal diskon

        // modal topping        
        handleOkTopping(bvModalEvent) {
            bvModalEvent.preventDefault();
            this.handleSubmitTopping();
        },
        handleSubmitTopping() {
            // Check if all data properties are not empty
            if (
                this.modalTopping.name !== '' &&
                this.modalTopping.price !== ''
            ) {
                // Reset all state properties to null

                for (let key in this.modalTopping) {
                    if (key.endsWith('State')) {
                        this.modalTopping[key] = null;
                    }
                }
                const tes = { ...this.modalTopping }
                this.optionTopping.push(tes)

                setTimeout(() => {
                    this.$bvModal.hide('modal-addTopping');
                }, 100);
                // If you want to close the modal after successful submission, you can do it here
            } else {
                // Set state properties for empty data properties to an error message
                for (let key in this.modalTopping) {
                    if (!key.endsWith('State')) {
                        const stateKey = key + 'State';
                        if (this.modalTopping[key] === '') {
                            this.modalTopping[stateKey] = 'Field is required!';
                        } else {
                            this.modalTopping[stateKey] = null;
                        }
                    }
                }
                // You can also display an alert or perform any other error handling here
                alert('Please fill in all required fields.');
            }
        },
        resetAddTopping() {
            // Reset all properties to their initial values
            this.modalTopping.name = '';
            this.modalTopping.price = '';
            this.modalTopping.titleState = null;
            this.modalTopping.priceState = null;

            // Additional resets if needed for other properties
        },

        // end modal topping
        customLabel(option) {
            return `${option.coaCode} (${option.coaName})`;
        },
        customLabel1(option) {
            return `${option.itemName} (${option.itemCode})`;
        },
        customLabel1(option) {
            return `${option.itemName} (${option.itemCode})`;
        },
        labelLocation(option) {
            return `${option.name} (${option.descript})`;
        },
        addCategory(newCat) {
            this.optionsCategory.push(newCat);
            this.kat = newCat;
        },
        addConvert1(newCat) {
            this.optionsUm.push(newCat);
            this.date = newCat;
        },
        addConvert2(newCat) {
            this.optionsUm.push(newCat);
            this.finance.itemUm = newCat;
        },
        addConvert3(newCat) {
            this.optionsUm.push(newCat);
            this.modalRecipe.recipeUM = newCat;
        },
        addConvert4(index, tag) {
            this.optionsUm.push(tag);
            this.arrBlank[index].itemUM = tag;
        },
        removeTopp(index) {
            this.$swal({
                title: 'Hapus Topping?',
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
                    this.optionTopping.splice(index, 1);
                }
            });
        },
        async addRowPrice() {
            this.arrBlank.push({
                priceCode: '',
                priceGroup: '',
                priceName: '',
                priceQty: '',
                priceValue: '',
                priceStartDate: this.currentDate,
                priceEndDate: ''
            })
        },
        removeRowPrice(index) {
            this.$swal({
                title: 'Hapus Baris?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        icon: 'success',
                        title: 'Baris terhapus!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.arrBlank.splice(index, 1);
                }
            });
        },
        removeData(index, data) {
            this.$swal({
                title: 'Hapus Price?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Hapus!',
                cancelButtonText: 'Kembali'
            }).then((result) => {
                if (result.isConfirmed && data === 'optionAdd') {
                    try {
                        this.optionAdd.splice(index, 1);
                        this.alertSuccessDelete()
                    } catch (error) {
                        this.alertFailedDelete()
                    }
                }
                else if (result.isConfirmed && data === 'optionRecipe') {
                    try {
                        console.log(this.optionRecipe)
                        this.optionRecipe.splice(index, 1);
                        this.alertSuccessDelete()
                    } catch (error) {
                        this.alertFailedDelete()
                    }
                }
                else if (result.isConfirmed && data === 'optionConvert') {
                    try {
                        console.log(this.optionConvert)
                        this.optionConvert.splice(index, 1);
                        this.alertSuccessDelete()
                    } catch (error) {
                        this.alertFailedDelete()
                    }
                }
                else if (result.isConfirmed && data === 'optionPrice') {
                    try {
                        console.log(this.optionPrice)
                        this.optionPrice.splice(index, 1);
                        this.alertSuccessDelete()
                    } catch (error) {
                        this.alertFailedDelete()
                    }
                }
            });
        },
        async itemTable() {
            const imageUrls = this.usaha.map(logo => logo.itemImage[0]);
            // await this.getLogo(imageUrls)
            this.totalRows = this.usaha.length;
            console.log(this.usaha)
            const oldCurrentPage = this.currentPage;
            this.currentPage = 1;
            this.$nextTick(() => {
                this.currentPage = oldCurrentPage
            });
        },
        alertDelete() {
            this.$swal({
                title: 'Anda Yakin?',
                text: "Data yang dihapus tidaak dapat dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya, Hapus Saja!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal(
                        'Terhapus!',
                        'Data anda berhasil terhapus.',
                        'success'
                    )
                }
            });
        },
        resetAll() {
            this.id = ''
            this.name = ''
            this.type = ''
            this.desc = ''
            this.group = ''
            this.kat = ''
            this.price = ''
            this.date = ''
            this.image = ''
            this.lot = ''
            this.batch = ''

            this.NameState = null
            this.typeState = null
            this.descState = null
            this.groupState = null
            this.katState = null
            this.priceState = null
            this.dateState = null
            this.imageState = null
        },
        resetModal() {
            this.arrBlank = []
            this.optionsAdd = []
            this.optionsTopping = []
            this.optionsDiskon = []
            this.optionsTax = []
            this.optionsConvert = []
            this.general = {
                image: '',
                jenis: '',
                group: '',
                type: '',
                merk: '',
                noSeri: '',
                bundling: ''
            },
                this.finance = {
                    standartHPP: '',
                    standartLabour: '',
                    itemUm: '',
                    defaultPrice: '',
                },
                this.inventory = {
                    poReceipt: '',
                    woReceipt: '',
                    formula: '',
                    unitConvertion: '',
                    minQty: ''

                },
                this.microCode = ''
            this.resetAll()
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
                    this.usaha = this.usaha.map((item, index) => Object.assign({}, item, this.listLogo[index]))
                })
                .catch(error => {
                    console.error(error);
                });
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
            this.general.image = URL.createObjectURL(file);
            this.general.xFilEkey = file;
        },
        // edit methods
        resetEditModal() {
            this.editModal.title = ''
            this.editModal.content = ''
            this.arrBlank = []
            this.optionsAdd = []
            this.optionsTopping = []
            this.optionsDiskon = []
            this.optionsTax = []
            this.optionsConvert = []
            this.general = {
                image: '',
                jenis: '',
                group: '',
                type: '',
                merk: '',
                noSeri: '',
                bundling: ''
            },
                this.finance = {
                    standartHPP: '',
                    standartLabour: '',
                    itemUm: '',
                    defaultPrice: '',
                },
                this.inventory = {
                    poReceipt: '',
                    woReceipt: '',
                    formula: '',
                    unitConvertion: '',
                    minQty: ''

                },
                this.microCode = ''
            this.resetAll()
            
            this.$bvModal.hide('edit-proc')
        },
        async edit(usaha, index, button) {
            let data = await getItemDetail(usaha._id)
            console.log(data)
            this.editModal.title = `Edit Data: ${usaha.itemName}`
            this.$root.$emit('bv::show::modal', this.editModal.id, button)
            if (data.length > 0) {
                data = data[0]
                console.log(data)
                this.id = data._id
                this.name = data.itemName
                this.type = this.optionsCoa.find(x => x.coaCode === data.itemCoA)
                this.group = data.itemCode
                this.kat = data.itemCategory
                this.desc = data.itemDescription
                this.date = this.optionsUm.find(x => x.name === data.itemUM)
                this.general.merk = data.itemMerk
                this.general.type = data.itemType
                this.general.jenis = data.itemJenis
                this.general.group = data.itemGroup
                this.general.bundling = this.usaha.filter(obj => data.itemBundling.includes(obj._id));
                // this.general.image = data.itemImage
                this.kat = data.itemCategory
                this.finance.standartHPP = data.itemStandartHPP
                this.finance.standartLabour = data.itemStandartLabour
                this.finance.itemUm = data.itemUM
                this.optionTopping = data.itemToping
                this.optionAdd = data.itemMasterPrice.map(x => ({ name: x.priceName, masterPrice: x.priceData }))
                this.optionDiskon = data.priceDiscount
                this.optionTax = data.itemPajak
                this.price = data.itemMasterPrice.find(x => x.priceName === 'Default').priceData[0].priceValue
                this.optionConvert = data.itemUmConvert
                const poReceiptId = data.itemDefaultSetup.find(x => x.name === 'itemPOReceipt').defaultValue
                const woReceiptId = data.itemDefaultSetup.find(x => x.name === 'itemWOReceipt').defaultValue
                this.inventory.poReceipt = this.optionsLocation.find(x => x._id === poReceiptId)
                this.inventory.woReceipt = this.optionsLocation.find(x => x._id === woReceiptId)
                // alert( this.inventory.woReceipt._id)
            }
        },
        async info(usaha, index, button) {
            let data = await getItemDetail(usaha._id)
            console.log(data)
            this.infoModal.title = `Detail Data: ${usaha.itemName}`
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            if (data.length > 0) {
                data = data[0]
                console.log(data)
                this.id = data._id
                this.name = data.itemName
                this.type = this.optionsCoa.find(x => x.coaCode === data.itemCoA)
                this.group = data.itemCode
                this.kat = data.itemCategory
                this.desc = data.itemDescription
                this.date = this.optionsUm.find(x => x.name === data.itemUM)
                this.general.merk = data.itemMerk
                this.general.type = data.itemType
                this.general.jenis = data.itemJenis
                this.general.group = data.itemGroup
                this.general.bundling = this.usaha.filter(obj => data.itemBundling.includes(obj._id));
                // this.general.image = data.itemImage
                this.kat = data.itemCategory
                this.finance.standartHPP = data.itemStandartHPP
                this.finance.standartLabour = data.itemStandartLabour
                this.finance.itemUm = data.itemUM
                this.optionTopping = data.itemToping
                this.optionAdd = data.itemMasterPrice.filter(x => x.priceName !== 'Default').map(x => ({ name: x.priceName, masterPrice: x.priceData }))
                this.optionDiskon = data.priceDiscount
                this.optionTax = data.itemPajak
                this.price = data.itemMasterPrice.find(x => x.priceName === 'Default').priceData[0].priceValue
                this.optionConvert = data.itemUmConvert
                const poReceiptId = data.itemDefaultSetup.find(x => x.name === 'itemPOReceipt').defaultValue
                const woReceiptId = data.itemDefaultSetup.find(x => x.name === 'itemWOReceipt').defaultValue
                this.inventory.poReceipt = this.optionsLocation.find(x => x._id === poReceiptId)
                this.inventory.woReceipt = this.optionsLocation.find(x => x._id === woReceiptId)
            }
        },
        handleEdit(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleEditSubmit()
        },
        handleEditSubmit() {
            if (this.name && this.group && this.kat && this.general.group) {
                this.$swal({
                    title: 'Anda Yakin?',
                    text: "Tekan Ok jika anda sudah yakin!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (this.general.bundling === '') {
                            this.general.bundling = []
                        }

                        // const defa
                        let finalPrice = this.optionAdd.reduce((result, item) => {
                            const newData = item.masterPrice.map((subItem) => ({
                                priceCode: "",
                                priceName: item.name,
                                priceGroup: item.name,
                                priceQty: subItem.priceQty,
                                priceValue: subItem.priceValue,
                                priceStartDate: subItem.priceStartDate,
                                priceEndDate: subItem.priceEndDate
                            }));

                            return [...result, ...newData];
                        }, []);
                        finalPrice = finalPrice.map(obj => {
                            if (obj.priceName === 'Default') {
                                obj.priceValue = this.price
                            }
                            return obj;
                        });
                        const tes = await getUsaha()
                        const moreData = [
                            { name: 'itemPOReceipt', defaultValue: this.inventory.poReceipt._id },
                            { name: 'itemWOReceipt', defaultValue: this.inventory.woReceipt._id }
                        ]
                        console.log('cok', moreData)
                        const data = {
                            // Other
                            itemDomainCode: tes.map(x => x._id),
                            itemDefaultSetup: moreData,

                            // General
                            itemImage: this.general.image,
                            itemCode: this.group,
                            itemName: this.name,
                            itemDescription: this.desc,
                            itemMerk: this.general.merk,
                            itemType: this.general.type,

                            itemCategory: this.kat,
                            itemJenis: this.general.jenis,
                            itemGroup: this.general.group[0],
                            itemBundling: this.general.bundling.map(x => x._id),

                            // Finance
                            itemStandartHPP: this.finance.standartHPP,
                            itemStandartLabour: this.finance.standartLabour,
                            itemUM: this.finance.itemUm,
                            itemToping: this.optionTopping,
                            itemMasterPrice: finalPrice,
                            // priceDiscount: this.optionDiskon,
                            itemPajak: this.optionTax,

                        }
                        if (typeof this.type === 'object') {
                            data.itemCoA = this.type.coaCode
                        } else {
                            data.itemCoA = ''
                        }
                        if (data.itemJenis === '') {
                            data.itemJenis = 'barang'
                        }
                        console.log('edited data', data)
                        await updateItem(data, this.id);
                        this.usaha = await getItem();
                        this.$swal(
                            'Berhasil!',
                            'Data berhasil Ditambahkan.',
                            'success'
                        )
                        this.itemTable();
                        this.$nextTick(() => {
                            this.$bvModal.hide('edit-modal')
                        });
                    }
                });
            } else {
                alert('ada data wajib yang belum diisi!')
            }
            // add validation
            if (this.general.group === '') {
                this.general.group = null
            }
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.group) {
                this.groupState = false;
            } else {
                this.groupState = true;
            }
            if (!this.kat) {
                this.katState = false;
            } else {
                this.katState = true;
            }
        },



        // modal price
        resetAddModal() {
            this.title = ''
            this.titleState = null
            this.arrBlank = []
        },
        resetDetailModal() {
            this.resetAddModal();

            this.$bvModal.hide('detail-proc')
        },
        handleOkPrice(bvModalEvent) {
            bvModalEvent.preventDefault()
            this.handleSubmitPrice()
        },
        handleSubmitPrice() {
            if (this.title && this.arrBlank.some(item => item.priceQty !== '') && this.arrBlank.some(item => item.priceValue !== '') && this.arrBlank.some(item => item.priceStartDate !== '')) {
                const data = {
                    name: this.title,
                    masterPrice: this.arrBlank
                }
                this.optionAdd.push(data)
                console.log(this.optionAdd)
                this.$swal({
                    icon: 'success',
                    title: 'Price Ditambahkan!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-addPrice')
                });
            }
            this.arrBlank.forEach(x => {
                if (x.priceQty === '') {
                    x.priceQty = null
                }
                if (x.priceValue === '') {
                    x.priceValue = null
                }
            });
            // add validation
            if (!this.title) {
                this.titleState = false;
            } else {
                this.titleState = true;
            }
        },

        editConvert(item, index, button) {
            this.size = 'md'
            this.editProc.title = 'Edit Konversi'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.convertIndex = index
            console.log(this.convertIndex)
            console.log(this.optionConvert)
            const priceContent = this.optionConvert[index]
            console.log(priceContent)
            this.arrBlank = JSON.parse(JSON.stringify(priceContent));
        },
        editPrice(item, index, button) {
            this.editProc.title = 'Edit Price'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.priceIndex = index
            const priceContent = this.optionAdd[index]
            this.title = priceContent.name
            this.arrBlank = JSON.parse(JSON.stringify(priceContent.masterPrice));
        },
        editRecipe(item, index, button) {
            this.editProc.title = 'Edit Recipe'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.recipeIndex = index
            const recipeContent = this.optionRecipe[index]
            console.log('edited data', recipeContent)
            this.title = recipeContent.processName

            this.modalRecipe.processName = recipeContent.processName;
            this.modalRecipe.processCode = recipeContent.processCode;
            this.modalRecipe.recipeUM = recipeContent.recipeUM;
            this.modalRecipe.recipeQty = recipeContent.recipeQty;
            this.modalRecipe.recipeItemResult = recipeContent.recipeItemResult;

            this.arrBlank = JSON.parse(JSON.stringify(recipeContent.recipeMaterial.map(x => {
                const data = {
                    ...x
                }
                data.itemUM = x.UM
                data.itemCode = { itemCode: x.itemCode, itemName: x.itemName }
                return data
            })));

        },
        editPrice1(item, index, button) {
            this.editProc.title = 'Edit Price'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.priceIndex = index
            const priceContent = this.optionPrice[index]
            console.log(priceContent)
            this.title = priceContent.priceName
            this.arrBlank = JSON.parse(JSON.stringify(priceContent.priceData));
        },
        detailPrice(price, index, button) {
            this.detailProc.title = 'Detail Price'
            this.$root.$emit('bv::show::modal', this.detailProc.id, button)
            this.priceIndex = index
            const priceContent = price
            console.log('tes ', this.optionPrice)
            console.log(priceContent)
            this.title = priceContent.name
            this.arrBlank = JSON.parse(JSON.stringify(priceContent.masterPrice));

        },
        submitEditPrice(event) {
            event.preventDefault();
            this.handleEditPrice();
        },
        handleEditPrice() {
            if (this.title) {
                console.log(this.optionAdd, 'add')
                this.optionAdd[this.priceIndex].masterPrice = this.arrBlank
                this.$swal({
                    icon: 'success',
                    title: 'Harga Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.resetEditModal()
                    this.$bvModal.hide('edit-proc')
                });
            }
            // add validation
            if (!this.title) {
                this.titleState = false;
            } else {
                this.titleState = true;
            }
        },
        saveEditAdd() {
        },

        saveEditTopp() {
            if (this.title) {
                this.optionPrice[this.priceIndex].masterPrice = this.arrBlank
                this.$swal({
                    icon: 'success',
                    title: 'Harga Diedit!',
                    showConfirmButton: false,
                    timer: 1500
                })
                this.$nextTick(() => {
                    this.resetEditModal()
                    this.$bvModal.hide('edit-proc')
                });
            }
            // add validation
            if (!this.title) {
                this.titleState = false;
            } else {
                this.titleState = true;
            }
        },
        resetEditProc() {
            this.editProc.title = ''
            this.editProc.content = ''

            this.microId = ''
            this.microCode = ''
            this.resetAll()
            this.toppIndex = ''
            this.priceIndex = ''
            this.arrBlank = []
        },
        handleProcSubmit() {
            // Exit when the form isn't valid
            if (this.name && this.desc && this.type) {

                this.$swal({
                    title: 'Anda Yakin?',
                    text: "Tekan Ok jika anda sudah yakin!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                })
                    .then(async (result) => {
                        if (result.isConfirmed) {
                            const link = this.dataId + '/' + this.procId
                            const data = {
                                appProcCode: this.id,
                                appProcName: this.name,
                                appProcDesc: this.desc,
                                appGroupApp: this.type
                            }
                            await updateProc(data, link);
                            this.usaha = await getItem(this.$route.name);
                            this.$swal(
                                'Berhasil!',
                                'Data berhasil Di Edit.',
                                'success'
                            )
                            this.procTable();
                            this.$nextTick(() => {
                                this.$bvModal.hide('edit-proc')

                            });
                        }
                    })
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
            if (this.type == "") {
                this.typeState = false;
            } else {
                this.typeState = true;
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
                this.$swal({
                    title: 'Anda Yakin?',
                    text: "Tekan Ok jika anda sudah yakin!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (this.id == '') {
                            alert(this.id, '" "')
                        }
                        const link = this.dataId + '/' + this.procId
                        const data = {
                            microCode: this.infoModal.content.appProcCode + '.' + this.microCode,
                            microName: this.name,
                            microType: this.type,
                            microDescription: this.desc,
                            microIcon: this.image,
                            microData: JSON.parse(this.id),
                            microPlaceholder: this.group,
                            microRouting: this.kat,
                            microNavigate: this.price,
                            microAPIFunctionScript: this.date
                        }
                        await addMicro(data, link)
                        this.usaha = await getItem(this.$route.name);
                        this.$swal(
                            'Berhasil!',
                            'Data berhasil Diedit.',
                            'success'
                        )
                        this.microTable();
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-addMicro');
                        });
                    }
                });
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

                this.$swal({
                    title: 'Anda Yakin?',
                    text: "Tekan Ok jika anda sudah yakin!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const link = this.dataId + '/' + this.procId + '/' + this.microId
                        const data = {
                            microCode: this.infoModal.content.appProcCode + '.' + this.microCode,
                            microName: this.name,
                            microType: this.type,
                            microDescription: this.desc,
                            microIcon: this.image,
                            microData: JSON.parse(this.id),
                            microPlaceholder: this.group,
                            microRouting: this.kat,
                            microNavigate: this.price,
                            microAPIFunctionScript: this.date
                        }
                        await updateMicro(data, link)
                        this.usaha = await getItem(this.$route.name);
                        this.$swal(
                            'Berhasil!',
                            'Data berhasil Diedit.',
                            'success'
                        )
                        this.microTable();
                        this.$nextTick(() => {
                            this.$bvModal.hide('edit-topp');
                        });
                    }
                });
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
        resetInfoModal() {
            this.infoModal.title = ''
            this.infoModal.content = ''
            this.microservice = ''
            this.procId = ''
            this.optionPrice = []
        },
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },
        async handleSubmit() {
            if (this.name && this.group && this.kat && this.general.group) {
                this.$swal({
                    title: 'Anda Yakin?',
                    text: "Tekan Ok jika anda sudah yakin!",
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok!'
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        if (this.general.bundling === '') {
                            this.general.bundling = []
                        }

                        const finalPrice = this.optionAdd.reduce((result, item) => {
                            const newData = item.masterPrice.map((subItem) => ({
                                priceCode: "",
                                priceName: item.name,
                                priceGroup: item.name,
                                priceQty: subItem.priceQty,
                                priceValue: subItem.priceValue,
                                priceStartDate: subItem.priceStartDate,
                                priceEndDate: subItem.priceEndDate
                            }));

                            return [...result, ...newData];
                        }, []);
                        const defaultPrice = {
                            priceCode: "",
                            priceName: "Default",
                            priceGroup: "Default",
                            priceQty: "1",
                            priceValue: this.price,
                            priceStartDate: this.currentDate,
                            priceEndDate: ""
                        }
                        finalPrice.unshift(defaultPrice)
                        const tes = await getUsaha()
                        const moreData = [
                            { name: 'itemPOReceipt', defaultValue: this.inventory.poReceipt._id },
                            { name: 'itemWOReceipt', defaultValue: this.inventory.woReceipt._id }
                        ]
                        console.log(moreData)
                        const data = {
                            // Other
                            itemDomainCode: tes.map(x => x._id),
                            itemDefaultSetup: JSON.stringify(moreData),

                            // General
                            xFilEkey: this.general.image,
                            itemCode: this.group,
                            itemName: this.name,
                            itemDescription: this.desc,
                            itemMerk: this.general.merk,
                            itemType: this.general.type,

                            itemCategory: this.kat,
                            itemJenis: this.general.jenis,
                            itemGroup: this.general.group[0],
                            itemBundling: JSON.stringify(this.general.bundling.map(x => x._id)),

                            // Finance
                            itemCoA: this.type.coaCode,
                            itemStandartHPP: this.finance.standartHPP,
                            itemStandartLabour: this.finance.standartLabour,
                            itemUM: this.finance.itemUm,
                            itemToping: JSON.stringify(this.optionTopping),
                            itemMasterPrice: JSON.stringify(finalPrice),
                            priceDiscount: JSON.stringify(this.optionDiskon),
                            itemPajak: JSON.stringify(this.optionTax),

                        }
                        if (data.itemCoa === undefined) {
                            data.itemCoa = ''
                        }
                        if (data.itemJenis === '') {
                            data.itemJenis = 'barang'
                        }
                        console.log(data)
                        const formData = new FormData();
                        // Iterate over the data object and append each key-value pair to the FormData object.
                        for (const key in data) {
                            if (data.hasOwnProperty(key)) {
                                formData.append(key, data[key]);
                            }
                        }

                        formData.forEach((value, key) => {
                            console.log(key, value);
                        });

                        await addItems(formData);
                        this.usaha = await getItem();
                        this.$swal(
                            'Berhasil!',
                            'Data berhasil Ditambahkan.',
                            'success'
                        )
                        this.itemTable();
                        this.$nextTick(() => {
                            this.$bvModal.hide('modal-add')
                        });
                    }
                });
            } else {
                alert('ada data wajib yang belum diisi!')
            }
            // add validation
            if (this.general.group === '') {
                this.general.group = null
            }
            if (!this.name) {
                this.NameState = false;
            } else {
                this.NameState = true;
            }
            if (!this.group) {
                this.groupState = false;
            } else {
                this.groupState = true;
            }
            if (!this.kat) {
                this.katState = false;
            } else {
                this.katState = true;
            }
        },
    },
    computed: {
        activeFields() {
            this.sorts = this.fields.filter(name => this.selected.includes(name));
            return this.sorts.map(v => {
                var usaha = {}
                usaha['key'] = v
                usaha['label'] = v
                usaha['thClass'] = 'text-center'
                if (v !== 'opsi') {
                    usaha['sortable'] = true
                } else {
                    usaha['fillterByFormatted'] = false,
                        usaha['thStyle'] = "width:80px",
                        usaha['class'] = "text-center"
                }
                if (v === 'itemName') {
                    usaha['label'] = "Nama Item"
                }
                if (v === 'itemCode') {
                    usaha['label'] = "Kode Item"
                }
                if (v === 'itemCoA') {
                    usaha['label'] = "Kode Akun"
                }
                if (v === 'itemCategory') {
                    usaha['label'] = "Kategori"
                }
                if (v === 'itemLocation') {
                    usaha['label'] = "Default Status"
                }
                if (v === 'lotNumber') {
                    usaha['label'] = "Lot Number"
                }
                if (v === 'batchNumber') {
                    usaha['label'] = "Batch Number"
                }
                return usaha
            });
        }
    },
    async mounted() {
        this.optionsMaterial = await getListArrItem('material-wip')
        this.optionsHasil = await getListArrItem('produk-wip')
        this.optionsUm = await getDataDistinc('itemUM')
        this.currentDate = await getFullDate()
        this.usaha = await getItem()
        console.log(this.usaha)
        const coa = await getCoa()
        this.optionsGroup = await get5();
        this.optionsCategory = await get6();
        this.optionsLocation = await getN();
        this.optionsTopping = await get7('product');
        this.optionsAddOns = await get7('addons');
        this.optionsCoa = coa.coaNonBank
        console.log(this.optionsCoa)
        this.itemTable();
    }
}
</script>

<style>
.btn:has(input[value="opsi"]) {
    display: none;
}

/* custom tabs */
#modal-add .modal-content .modal-body {
    padding: 0;
}

.custom-tabs .card-header {
    background: #f7f7f7;
    padding-bottom: 0;
}

.custom-tabs .card-header .nav-tabs {
    margin-left: 10px;
}

.custom-tabs .card-header .nav-tabs .nav-item .nav-link {
    padding: 0.25rem 1.25rem
}

.custom-tabs .card-header .nav-tabs .nav-item .active {
    border-radius: 5px 5px 0 0;
    border: 1px solid #DEE2E6;
    border-bottom: none;
    background: #fff;
}

/* custom multiselect */
.multiselect {
    min-height: 0;
}

.multiselect .multiselect__tags {
    min-height: 0;
    padding: 0px 40px 0 8px;
}

.multiselect .multiselect__tags .multiselect__placeholder,
.multiselect .multiselect__tags .multiselect__single {
    margin: 0;
}

.multiselect .multiselect__select {
    height: 25px;
}

.multiselect .multiselect__content-wrapper .multiselect__content .multiselect__element .multiselect__option,
.multiselect .multiselect__content-wrapper .multiselect__content .multiselect__element .multiselect__option:after {
    padding: 6px 12px;
    min-height: 0;
    line-height: 16px;
}

/* Other */
.form-control {
    padding: 0 1rem !important;
}

.input-group-text {
    padding: 0 1rem !important;
}

.invalid .multiselect__tags {
    border: 1px solid #ED4C78;
}
</style>