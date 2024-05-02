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
                <li>Formula</li>
            </ul>
        </div>
        <div class="col-4 text-center">
            <span class="h2">List Formula</span>
        </div>
        <hr class="mb-3 mt-1">
            </div>
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
                            <b-form-checkbox-group id="checkbox-group-1" v-model="selected" :options="fields"
                                name="flavour-1" buttons>
                            </b-form-checkbox-group>
                        </b-dropdown>
                    </b-col>
                </b-row>
                <!-- Main Table -->
                <b-table ref="tableUsaha" label-sort-asc="" label-sort-desc="" label-sort-clear="" :bordered="true"
                    stacked="md" :items="usaha" :fields="activeFields" :current-page="currentPage" :per-page="perPage"
                    :filter="filter" tbody-tr-class="row-class" @filtered="onFiltered" v-if="selected.length > 0">>

                    <template #cell(itemRecipe)="data">
                        <div class="inner-table">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style="width: 100px;">Kode Proses</th>
                                        <th style="width: auto;">Nama</th>
                                        <th style="width: 100px;">Qty</th>
                                        <th style="width: 75px;">UM</th>
                                        <!-- Tambahkan kolom lain di sini sesuai kebutuhan -->
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in data.item.itemRecipe" :key="index">
                                        <td style=" font-size: 10px;">{{ item.processCode }}</td>
                                        <td style=" font-size: 10px;">{{ item.processName }}</td>
                                        <td style=" font-size: 10px;">{{ item.recipeQty }}</td>
                                        <td style=" font-size: 10px;">{{ item.recipeUM }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </template>
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
                    no-close-on-backdrop hide-header-close>
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Konversi" label-for="itemConvert"
                                    invalid-feedback="Anda Harus Memilih Unit Konversi!" :state="imageState">
                                    <multiselect id="itemConvert" v-model="image" :options="fixItem" placeholder="Select"
                                        :multiple="false" :allow-empty="required" :custom-label="customLabel1" disabled>
                                    </multiselect>
                                </b-form-group>
                            </div>

                            <div class="col-md-6 mb-2">
                                <b-form-group label="Minimal Qty. Produksi" label-for="itemJenis"
                                    invalid-feedback="Harus Diisi!">
                                    <b-input-group append="pcs">
                                        <b-form-input v-model="kat" type="number" disabled
                                            placeholder="Masukan Minimal kuantitas produksi">
                                        </b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <!-- resep product -->
                            <div class="col-md-12 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center"
                                    style="background: #113448">
                                    <span class="text-white m-0">Formula/Resep Produk</span>
                                    <div class="d-flex align-items-center">
                                        <button v-if="showRecipe" @click="showRecipe = !showRecipe" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showRecipe = !showRecipe" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showRecipe" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Kode Proses</th>
                                            <th scope="col">Nama Proses</th>
                                            <th scope="col">UM Resep</th>
                                            <th scope="col">Qty Resep</th>
                                            <th scope="col" class="text-center">Material Resep</th>
                                            <th scope="col" class="text-center">Hasil</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(recipe, i) in optionRecipe" :key="i">
                                            <td class="align-top">{{ recipe.processCode }}</td>
                                            <td class="align-top">{{ recipe.processName }}</td>
                                            <td class="align-top">{{ recipe.recipeUM }}</td>
                                            <td class="align-top">{{ recipe.recipeQty }}</td>
                                            <td>
                                                <p v-for="material in recipe.recipeMaterial" class="m-0">- {{
                                                    material.itemName }}({{ material.qty }} {{ material.UM }})</p>
                                            </td>
                                            <td class="align-top">
                                                    <template v-if="(typeof recipe.recipeItemResult === 'object')">
                                                        {{ recipe.recipeItemResult.itemName }}
                                                    </template>
                                                </td>
                                            <td class="align-top text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="watchRecipe(recipe, i, $event.target)">
                                                    <i class="bi bi-eye text-success"></i>
                                                </button>
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
                        <div v-else class="w-100 d-flex justify-content-end">
                            <b-button class="me-2" variant="secondary" size="sm" @click="$bvModal.hide('info-modal')">
                                Kembali
                            </b-button>
                            <!-- <b-button size="sm" variant="primary" @click="addMicroservice">Tambah Micro</b-button> -->
                        </div>
                    </template>
                </b-modal>

                <b-modal :id="editModal.id" size="lg" :title="editModal.title" @hidden="resetEditModal" @ok="handleEdit"
                    ok-title="Simpan">

                    <form ref="form" @submit.stop.prevent="handleEditSubmit">
                        <div class="row">
                            <div class="col-md-6 mb-2">
                                <b-form-group label="Konversi" label-for="itemConvert"
                                    invalid-feedback="Anda Harus Memilih Unit Konversi!" :state="imageState">
                                    <multiselect id="itemConvert" v-model="image" :options="fixItem" placeholder="Select"
                                        :multiple="false" :allow-empty="required" :custom-label="customLabel1">
                                    </multiselect>
                                </b-form-group>
                            </div>

                            <div class="col-md-6 mb-2">
                                <b-form-group label="Minimal Qty. Produksi" label-for="itemJenis"
                                    invalid-feedback="Harus Diisi!">
                                    <b-input-group append="pcs">
                                        <b-form-input v-model="kat" type="number"
                                            placeholder="Masukan Minimal kuantitas produksi">
                                        </b-form-input>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                            <!-- resep product -->
                            <div class="col-md-12 mt-2">
                                <div class="px-2 d-flex justify-content-between align-items-center"
                                    style="background: #113448">
                                    <span class="text-white m-0">Formula/Resep Produk</span>
                                    <div class="d-flex align-items-center">
                                        <button type="button" v-b-modal.modal-addRecipe class="btn p-0"
                                            data-toggle="tooltip" title="Tambah Formula/Resep Produk">
                                            <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                        </button>
                                        <button v-if="showRecipe" @click="showRecipe = !showRecipe" type="button"
                                            class="btn p-0" data-toggle="tooltip" title="Hide">
                                            <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                        <button v-else @click="showRecipe = !showRecipe" type="button" class="btn p-0"
                                            data-toggle="tooltip" title="Show">
                                            <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                        </button>
                                    </div>
                                </div>
                                <table v-if="showRecipe" class="table border">
                                    <thead>
                                        <tr>
                                            <th scope="col">Kode Proses</th>
                                            <th scope="col">Nama Proses</th>
                                            <th scope="col">UM Resep</th>
                                            <th scope="col">Qty Resep</th>
                                            <th scope="col" class="text-center">Material Resep</th>
                                            <th scope="col" class="text-center">Hasil</th>
                                            <th scope="col" class="text-center">Opsi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(recipe, i) in optionRecipe" :key="i">
                                            <td class="align-top">{{ recipe.processCode }}</td>
                                            <td class="align-top">{{ recipe.processName }}</td>
                                            <td class="align-top">{{ recipe.recipeUM }}</td>
                                            <td class="align-top">{{ recipe.recipeQty }}</td>
                                            <td>
                                                <p v-for="material in recipe.recipeMaterial" class="m-0">- {{
                                                    material.itemName }}({{ material.qty }} {{ material.UM }})</p>
                                            </td>
                                            <td class="align-top">
                                                    <template v-if="(typeof recipe.recipeItemResult === 'object')">
                                                        {{ recipe.recipeItemResult.itemName }}
                                                    </template>
                                                </td>
                                            <td class="align-top text-center">
                                                <button type="button" class="btn p-0"
                                                    @click="editRecipeData(recipe, i, $event.target)">
                                                    <i class="bi bi-pencil-square text-warning"></i>
                                                </button>

                                                <button type="button" class="btn p-0"
                                                    @click="removeData(i, 'optionRecipe')">
                                                    <i class="bi bi-trash text-danger"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </b-modal>
                <b-modal :id="editRecipe.id" size="lg" :title="editRecipe.title" no-close-on-esc no-close-on-backdrop
                    hide-header-close @hide="resetAllIndex">
                    
                    <div class="row">
                        <div class="col-md-6 mb-2">
                            <b-form-group label="*Kode Proses">
                                <b-form-input id="recipeCode" v-model="modalRecipe.processCode" required
                                    placeholder="Masukan Kode Proses" disabled
                                    :state="modalRecipe.processCode === null ? false : null"></b-form-input>

                                <!-- Updated the variable name -->
                            </b-form-group>
                        </div>
                        <div class="col-md-6 mb-2">
                            <b-form-group label="*Nama Proses">
                                <b-form-input id="recipeName" v-model="modalRecipe.processName" required
                                    placeholder="Masukan Nama Proses" disabled
                                    :state="modalRecipe.processName === null ? false : null"></b-form-input>

                                <!-- Updated the variable name -->
                            </b-form-group>
                        </div>
                        <div class="col-md-4 mb-2">
                            <b-form-group label="*Qty Resep">
                                <b-form-input type="number" id="recipeQty" v-model="modalRecipe.recipeQty" required
                                    placeholder="Kuantitas yg dihasilkan resep" disabled
                                    :state="modalRecipe.recipeQty === null ? false : null"></b-form-input>
                                <!-- Updated the variable name -->
                            </b-form-group>
                        </div>
                        <div class="col-md-4 mb-2">
                            <b-form-group label="*UM Resep">
                                <multiselect id="itemUm" v-model="modalRecipe.recipeUM" :options="optionsUm"
                                    placeholder="Pilih UM" :show-labels="true" :taggable="true" @tag="addConvert3"
                                    :multiple="false" :allow-empty="required" disabled
                                    :class="modalRecipe.recipeUM === null ? 'invalid' : ''">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-4 mb-2">
                            <b-form-group label="*Hasil Resep">
                                <multiselect id="itemUm" v-model="modalRecipe.recipeItemResult" :options="optionsHasil"
                                    placeholder="Hasil yg dihasilkan" :show-labels="false" :custom-label="customLabel1"
                                    :multiple="false" :allow-empty="required" disabled
                                    :class="modalRecipe.recipeItemResult === null ? 'invalid' : ''">
                                </multiselect>
                            </b-form-group>
                        </div>
                        <div class="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                            <h5>List Material Resep</h5>
                        </div>
                        <div class="col-md-12">
                        {{ fixMaterial }}
                            <table v-if="showRecipe" class="table border">
                                <thead>
                                    <tr>
                                        <th class="text-center" scope="col">*Nama Item</th>
                                        <th class="text-center">&</th>
                                        <th class="text-center" scope="col">Kode Item</th>
                                        <th class="text-center" scope="col">Deskripsi</th>
                                        <th class="text-center" scope="col">*UM</th>
                                        <th class="text-center" scope="col">*Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(recipe, i) in arrBlank" :key="i">
                                        <td colspan="3">
                                            <b-form-group>
                                                <multiselect id="recipeCode" v-model="recipe.itemCode" disabled
                                                    :options="fixMaterial" placeholder="Select one" :taggable="false"
                                                    :multiple="false" :show-labels="false" :custom-label="customLabel1"
                                                    :allow-empty="required" @input="changeUM(recipe, i)"
                                                    :class="recipe.itemCode === null ? 'invalid' : ''">
                                                </multiselect>
                                            </b-form-group>
                                        </td>
                                        <td style="width: 175px">
                                            <b-form-group>
                                                <b-form-input id="itemDescription" v-model="recipe.itemDescription" required
                                                    class="px-2" disabled
                                                    :state="recipe.itemDescription === null ? false : null"></b-form-input>
                                            </b-form-group>
                                        </td>
                                        <td>
                                            <b-form-group>
                                                <multiselect id="itemUmA" v-model="recipe.itemUM" :options="optionsUm" disabled
                                                    placeholder="Pilih" :show-labels="false" :taggable="true"
                                                    @tag="addConvert4(i, $event)" :multiple="false" :allow-empty="required"
                                                    :class="recipe.itemUM === null ? 'invalid' : ''">
                                                </multiselect>
                                            </b-form-group>
                                        </td>
                                        <td style="width: 100px">
                                            <b-form-group>
                                                <b-form-input type="number" id="qty" v-model="recipe.qty" required disabled
                                                    :state="recipe.qty === null ? false : null"></b-form-input>
                                            </b-form-group>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <template #modal-footer>
                        <b-button variant="secondary" @click="resetEditRecipe">Kembali</b-button>
                    </template>
                </b-modal>
                <b-modal :id="editProc.id" size="lg" :title="editProc.title" no-close-on-esc no-close-on-backdrop
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
                    <form ref="form" class="row" v-else-if="recipeIndex !== ''">
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
                                                    :options="fixMaterial" placeholder="Select one" :taggable="false"
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
                    <form v-else></form>
                    <template #modal-footer v-if="recipeIndex !== ''">
                        <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                        <b-button type="submit" variant="success" @click="submitEditRecipe"
                            :disabled="title === ''">Edit</b-button>
                    </template>
                    <template #modal-footer v-else-if="priceIndex !== ''">
                        <b-button variant="secondary" @click="resetEditModal">Kembali</b-button>
                        <b-button type="submit" variant="success" @click="submitEditPrice"
                            :disabled="title === ''">Edit</b-button>
                    </template>
                    <template #modal-footer v-else>
                        <b-button variant="secondary" @click="resetEditProc">Kembali</b-button>
                    </template>
                </b-modal>
                <b-modal id="modal-add" size="lg" title="Tambah Formula" no-close-on-esc no-close-on-backdrop ref="modal"
                    @show="resetModal" @hidden="resetModal" @ok="handleOk">
                    <form ref="form" @submit.stop.prevent="handleSubmit">
                        <div class="p-5">
                            <div class="row">
                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Konversi" label-for="itemConvert"
                                        invalid-feedback="Anda Harus Memilih Unit Konversi!" :state="imageState">
                                        <multiselect id="itemConvert" v-model="image" :options="fixItem"
                                            placeholder="Select" :multiple="false" :allow-empty="required"
                                            :custom-label="customLabel1">
                                        </multiselect>
                                    </b-form-group>
                                </div>

                                <div class="col-md-6 mb-2">
                                    <b-form-group label="Minimal Qty. Produksi" label-for="itemJenis"
                                        invalid-feedback="Harus Diisi!">
                                        <b-input-group append="pcs">
                                            <b-form-input v-model="kat" type="number"
                                                placeholder="Masukan Minimal kuantitas produksi">
                                            </b-form-input>
                                        </b-input-group>
                                    </b-form-group>
                                </div>
                                <!-- resep product -->
                                <div class="col-md-12 mt-2">
                                    <div class="px-2 d-flex justify-content-between align-items-center"
                                        style="background: #113448">
                                        <span class="text-white m-0">Formula/Resep Produk</span>
                                        <div class="d-flex align-items-center">
                                            <button type="button" v-b-modal.modal-addRecipe class="btn p-0"
                                                data-toggle="tooltip" title="Tambah Formula/Resep Produk">
                                                <i class="bi bi-plus text-white" style="font-size: 25px;"></i>
                                            </button>
                                            <button v-if="showRecipe" @click="showRecipe = !showRecipe" type="button"
                                                class="btn p-0" data-toggle="tooltip" title="Hide">
                                                <i class="bi bi-caret-up-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                            <button v-else @click="showRecipe = !showRecipe" type="button" class="btn p-0"
                                                data-toggle="tooltip" title="Show">
                                                <i class="bi bi-caret-down-square text-white" style="font-size: 20px;"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <table v-if="showRecipe" class="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">Kode Proses</th>
                                                <th scope="col">Nama Proses</th>
                                                <th scope="col">UM Resep</th>
                                                <th scope="col">Qty Resep</th>
                                                <th scope="col" class="text-center">Material Resep</th>
                                                <th scope="col" class="text-center">Hasil</th>
                                                <th scope="col" class="text-center">Opsi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(recipe, i) in optionRecipe" :key="i">
                                                <td class="align-top">{{ recipe.processCode }}</td>
                                                <td class="align-top">{{ recipe.processName }}</td>
                                                <td class="align-top">{{ recipe.recipeUM }}</td>
                                                <td class="align-top">{{ recipe.recipeQty }}</td>
                                                <td>
                                                    <p v-for="material in recipe.recipeMaterial" class="m-0">- {{
                                                        material.itemName }}({{ material.qty }} {{ material.UM }})</p>
                                                </td>
                                                <td class="align-top">
                                                    <template v-if="(typeof recipe.recipeItemResult === 'object')">
                                                        {{ recipe.recipeItemResult.itemName }}
                                                    </template>
                                                </td>
                                                <td class="align-top text-center">
                                                    <button type="button" class="btn p-0"
                                                        @click="editRecipeData(recipe, i, $event.target)">
                                                        <i class="bi bi-pencil-square text-warning"></i>
                                                    </button>

                                                    <button type="button" class="btn p-0"
                                                        @click="removeData(i, 'optionRecipe')">
                                                        <i class="bi bi-trash text-danger"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
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
                                                <b-form-input type="number" id="priceValue" v-model="price.priceQty"
                                                    required :state="price.priceQty === null ? false : null"></b-form-input>
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
                                                <b-form-input type="number" id="diskonValue" v-model="diskon.diskonQty"
                                                    required class="px-2" style="width: 60px"></b-form-input>
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
                                                    <b-form-input type="number" id="diskonValue"
                                                        v-model="diskon.diskonValue" required class="px-2"></b-form-input>
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
                                                <b-form-input type="date" id="diskonQTY" v-model="diskon.diskonEndDate"
                                                    required class="px-2" style="width: 125px"></b-form-input>
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
                                            <b-form-group
                                                :invalid-feedback="tax.taxName === '' ? 'Tidak Boleh Kosong!' : null"
                                                :state="tax.taxName === '' ? false : null">
                                                <b-form-input id="taxName" v-model="tax.taxName" required></b-form-input>
                                            </b-form-group>
                                        </td>
                                        <td>
                                            <b-form-group
                                                :invalid-feedback="tax.taxValue === '' ? 'Tidak Boleh Kosong!' : null"
                                                :state="tax.taxValue === '' ? false : null">
                                                <b-input-group append="%">
                                                    <b-form-input type="number" id="taxValue" v-model="tax.taxValue"
                                                        required min="0" max="100"></b-form-input>
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
                                                    :options="fixMaterial" placeholder="Select one" :taggable="false"
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
import { getFormula, addFormula, updateFormula, getCoa, getItem, get5, get6, get7, getN, getDataDistinc, getListArrItem } from '../components/services/components'
import { getFullDate } from '../components/function/date'
import { getUsaha, addMicro, updateUsaha, updateProc, updateMicro } from "./services/usaha";
export default {
    props: ['itemDomain'],
    data() {
        return {
            optionsItem: [],
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
            fields: ['itemCode', 'itemName', 'itemMinRecipe', 'itemRecipe', 'opsi'],
            sorts: [],
            // selected: ['itemCode', 'coa', 'itemName', 'itemCategory', 'itemLocation', 'lotNumber', 'batchNumber', 'satuan', 'convert', 'opsi'],
            selected: ['itemCode', 'itemName', 'itemMinRecipe', 'itemRecipe', 'opsi'],
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
            editRecipe: {
                id: 'edit-recipe',
                title: '',
                content: ''
            },
            editProc: {
                id: 'edit-proc',
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
        resetEditRecipe() {
            this.editProc.title = ''
            this.editProc.content = ''

            this.microId = ''
            this.microCode = ''
            this.resetAll()
            this.toppIndex = ''
            this.priceIndex = ''
            this.arrBlank = []
            this.$bvModal.hide('edit-recipe')
        },
        submitEditRecipe(event) {
            event.preventDefault();
            this.saveEditRecipe();
        },
        saveEditRecipe() {
            if (this.modalRecipe.processName && this.modalRecipe.processCode && this.modalRecipe.recipeUM && this.modalRecipe.recipeQty && this.modalRecipe.recipeItemResult && this.optionRecipe.length > 0) {
                this.optionRecipe[this.recipeIndex].processName = this.modalRecipe.processName
                this.optionRecipe[this.recipeIndex].processCode = this.modalRecipe.processCode
                this.optionRecipe[this.recipeIndex].recipeUM = this.modalRecipe.recipeUM
                this.optionRecipe[this.recipeIndex].recipeQty = this.modalRecipe.recipeQty
                this.optionRecipe[this.recipeIndex].recipeItemResult = this.modalRecipe.recipeItemResult
                this.optionRecipe[this.recipeIndex].recipeMaterial = this.arrBlank.map(x => ({ item: x.itemCode._id, itemCode: x.itemCode.itemCode, itemName: x.itemCode.itemName, UM: x.itemUM, qty: x.qty, itemDescription: x.itemDescription }))

                // console.log(this.optionRecipe, 'add')
                this.$swal({
                    icon: 'success',
                    title: 'Berhasil!',
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
        resetAllIndex() {
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

            } else {
                alert('Ada data wajib yang masih Kosong!')
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
            this.usaha = await getFormula()
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
            this.optionRecipe = []
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
            this.resetAll()
        },
        edit(usaha, index, button) {
            const tes = {...usaha}
            this.editModal.title = `Edit Data: ${usaha.itemName}`
            this.editModal.content = usaha
            this.$root.$emit('bv::show::modal', this.editModal.id, button)

            this.kat = tes.itemMinRecipe
            this.image = this.optionsItem.find(x => x._id === tes._id)
            console.log(tes.itemRecipe)
            console.log(this.optionRecipe)
            this.optionRecipe = tes.itemRecipe.map(x => x)
        },
        handleEdit(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleEditSubmit()
        },
        handleEditSubmit() {
            if (this.image && this.kat && this.optionRecipe.length > 0) {

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
                        const id = this.image._id
                        const data = {
                            ...this.image,
                            itemMinRecipe: this.kat,
                            itemRecipe: this.optionRecipe
                        }

                        console.log(id, data)
                        await updateFormula(data, id);
                        // this.usaha = await getFormula();
                        this.$swal(
                            'Berhasil!',
                            'Data berhasil Diedit!',
                            'success'
                        )
                        this.itemTable();
                        this.$nextTick(() => {
                            this.$bvModal.hide('edit-modal')
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
        resetEditModal() {
            this.resetAddModal();

            this.$bvModal.hide('edit-proc')
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

        editPrice(item, index, button) {
            this.editProc.title = 'Edit Price'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.priceIndex = index
            const priceContent = this.optionAdd[index]
            this.title = priceContent.name
            this.arrBlank = JSON.parse(JSON.stringify(priceContent.masterPrice));
        },
        editRecipeData(item, index, button) {
            this.editProc.title = 'Edit Resep'
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
        watchRecipe(item, index, button) {
            this.editRecipe.title = 'Detail Resep'
            this.$root.$emit('bv::show::modal', this.editRecipe.id, button)
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
            this.editProc.title = 'Detail Price'
            this.$root.$emit('bv::show::modal', this.editProc.id, button)
            this.priceIndex = index
            const priceContent = price
            console.log('tes ', this.optionPrice)
            this.title = priceContent.priceName
            this.arrBlank = JSON.parse(JSON.stringify(priceContent.priceData));
        },
        submitEditPrice(event) {
            event.preventDefault();
            this.handleEditPrice();
        },
        handleEditPrice() {
            console.log(this.priceIndex)
            if (this.optionPrice.length !== 0 && this.optionAdd.length === 0) {
                this.saveEditTopp()
            } else if (this.optionPrice.length === 0 && this.optionAdd.length !== 0) {
                this.saveEditAdd()
            } else {
                console.log('opsi 3')
            }
        },
        saveEditAdd() {
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
                            this.usaha = await getFormula(this.$route.name);
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
                        this.usaha = await getFormula(this.$route.name);
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
                        this.usaha = await getFormula(this.$route.name);
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
        // add method info
        info(usaha, index, button) {
            const tes = {...usaha}
            this.infoModal.title = `Detail Data: ${usaha.itemName}`
            this.infoModal.content = usaha
            this.$root.$emit('bv::show::modal', this.infoModal.id, button)

            this.kat = tes.itemMinRecipe
            this.image = this.optionsItem.find(x => x._id === tes._id)
            console.log(tes.itemRecipe)
            console.log(this.optionRecipe)
            this.optionRecipe = tes.itemRecipe.map(x => x)
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
            if (this.image && this.kat && this.optionRecipe.length > 0) {
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
                        await addFormula(this.optionRecipe.map(x => ({ ...x, recipeItemResult: x.recipeItemResult._id })), this.image._id, this.kat);
                        // this.usaha = await getFormula();
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
        fixMaterial() {
            const tes = this.arrBlank.filter(x => x.itemCode !== '' && x.itemCode !== null)
            
            return this.optionsMaterial.filter(x => !tes.map(y => y.itemCode._id).includes(x._id))
        },
        fixItem() {
            const tes = this.usaha.map(x => x.itemCode)
            return this.optionsItem.filter(x => !tes.includes(x.itemCode))
        },
        activeFields() {
            this.sorts = this.fields.filter(name => this.selected.includes(name));
            return this.sorts.map(v => {
                var usaha = {}
                usaha['key'] = v
                usaha['label'] = v
                usaha['thClass'] = 'text-center'
                usaha['class'] = 'align-top'
                if (v !== 'opsi') {
                    usaha['sortable'] = true
                } else {
                    usaha['fillterByFormatted'] = false,
                        usaha['thStyle'] = "width:80px",
                        usaha['class'] = "text-center align-top"
                }
                if (v === 'itemName') {
                    usaha['label'] = "Nama Item"
                }
                if (v === 'itemCode') {
                    usaha['label'] = "Kode Item"
                }
                if (v === 'itemMinRecipe') {
                    usaha['label'] = "Min. Qty"
                }
                if (v === 'itemRecipe') {
                    usaha['label'] = "Resep Item"
                }
                return usaha
            });
        }
    },
    async mounted() {
        this.itemTable();
        this.optionsItem = await getItem()
        this.optionsMaterial = await getListArrItem('material-wip')
        this.optionsHasil = await getListArrItem('produk-wip')
        this.optionsUm = await getDataDistinc('itemUM')
        this.currentDate = await getFullDate()
        const coa = await getCoa()
        this.optionsGroup = await get5();
        this.optionsCategory = await get6();
        this.optionsLocation = await getN();
        this.optionsTopping = await get7('product');
        this.optionsAddOns = await get7('addons');
        this.optionsCoa = coa.dataList
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