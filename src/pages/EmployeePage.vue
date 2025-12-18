<template>
  <f7-page name="employees">
    <f7-navbar title="Manajemen Karyawan" />
    
    <f7-page-content>
      <!-- Search and Add Button -->
      <f7-block>
        <f7-row>
          <f7-col width="70">
            <f7-searchbar
              :custom-search="true"
              placeholder="Cari karyawan..."
              :clear-button="true"
              @searchbar:search="onSearch"
            ></f7-searchbar>
          </f7-col>
          <f7-col width="30">
            <f7-button fill @click="openAddSheet">+ Tambah</f7-button>
          </f7-col>
        </f7-row>
      </f7-block>

      <!-- Employee Stats -->
      <div class="stats-grid" style="padding: 0 12px;">
        <div class="stats-card">
          <div class="stats-number">{{ employees.length }}</div>
          <div class="stats-label">Total Karyawan</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ activeEmployees }}</div>
          <div class="stats-label">Karyawan Aktif</div>
        </div>
        <div class="stats-card">
          <div class="stats-number">{{ onDutyEmployees }}</div>
          <div class="stats-label">Sedang Bertugas</div>
        </div>
      </div>

      <!-- Department Filter -->
      <f7-block-title>Filter Departemen</f7-block-title>
      <f7-block>
        <f7-segmented strong>
          <f7-button :active="activeDept === 'all'" @click="filterDept('all')">Semua</f7-button>
          <f7-button :active="activeDept === 'kasir'" @click="filterDept('kasir')">Kasir</f7-button>
          <f7-button :active="activeDept === 'barista'" @click="filterDept('barista')">Barista</f7-button>
          <f7-button :active="activeDept === 'dapur'" @click="filterDept('dapur')">Dapur</f7-button>
        </f7-segmented>
      </f7-block>

      <!-- Employee List -->
      <f7-block-title>Daftar Karyawan</f7-block-title>
      <f7-card>
        <f7-card-content :padding="false">
          <f7-list media-list>
            <f7-list-item 
              v-for="employee in filteredEmployees" 
              :key="employee.id"
              :title="employee.name"
              :subtitle="`${employee.position} | ${employee.phone}`"
              :text="`Bergabung: ${employee.joinDate} | Gaji: Rp ${employee.salary.toLocaleString('id-ID')}`"
              swipeout
              @swipeout:deleted="deleteEmployee(employee.id)"
            >
              <template #media>
                <div style="width: 44px; height: 44px; border-radius: 50%; background: var(--coffee-light); display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 18px;">
                  {{ employee.name.charAt(0).toUpperCase() }}
                </div>
              </template>
              <template #after>
                <f7-badge :color="employee.status === 'Aktif' ? 'green' : employee.status === 'Bertugas' ? 'blue' : 'gray'">
                  {{ employee.status }}
                </f7-badge>
              </template>
              <f7-swipeout-actions right>
                <f7-swipeout-button color="blue" @click="editEmployee(employee)">Edit</f7-swipeout-button>
                <f7-swipeout-button color="green" @click="viewSchedule(employee)">Jadwal</f7-swipeout-button>
                <f7-swipeout-button color="red" delete confirm-text="Hapus karyawan ini?">Hapus</f7-swipeout-button>
              </f7-swipeout-actions>
            </f7-list-item>
          </f7-list>
        </f7-card-content>
      </f7-card>
    </f7-page-content>

    <!-- Add/Edit Employee Sheet -->
    <f7-sheet
      :opened="sheetOpened"
      @sheet:closed="sheetOpened = false"
      style="height: auto;"
      swipe-to-close
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Tutup</f7-link>
        </div>
      </f7-toolbar>
      <f7-page-content>
        <f7-block-title>{{ editMode ? 'Edit' : 'Tambah' }} Karyawan</f7-block-title>
        <f7-list>
          <f7-list-input
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan nama lengkap"
            :value="currentEmployee.name"
            @input="currentEmployee.name = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Nomor Telepon"
            type="tel"
            placeholder="Contoh: 08123456789"
            :value="currentEmployee.phone"
            @input="currentEmployee.phone = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Email"
            type="email"
            placeholder="email@example.com"
            :value="currentEmployee.email"
            @input="currentEmployee.email = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Alamat"
            type="textarea"
            placeholder="Masukkan alamat lengkap"
            :value="currentEmployee.address"
            @input="currentEmployee.address = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Departemen"
            type="select"
            :value="currentEmployee.department"
            @input="currentEmployee.department = $event.target.value"
          >
            <option value="kasir">Kasir</option>
            <option value="barista">Barista</option>
            <option value="dapur">Dapur</option>
            <option value="manager">Manager</option>
          </f7-list-input>
          <f7-list-input
            label="Posisi"
            type="text"
            placeholder="Contoh: Kepala Barista"
            :value="currentEmployee.position"
            @input="currentEmployee.position = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Gaji (Rp)"
            type="number"
            placeholder="Masukkan gaji"
            :value="currentEmployee.salary"
            @input="currentEmployee.salary = parseFloat($event.target.value)"
          ></f7-list-input>
          <f7-list-input
            label="Tanggal Bergabung"
            type="date"
            :value="currentEmployee.joinDate"
            @input="currentEmployee.joinDate = $event.target.value"
          ></f7-list-input>
          <f7-list-input
            label="Status"
            type="select"
            :value="currentEmployee.status"
            @input="currentEmployee.status = $event.target.value"
          >
            <option value="Aktif">Aktif</option>
            <option value="Bertugas">Bertugas</option>
            <option value="Cuti">Cuti</option>
            <option value="Nonaktif">Nonaktif</option>
          </f7-list-input>
        </f7-list>
        <f7-block>
          <f7-button fill large @click="saveEmployee">Simpan</f7-button>
        </f7-block>
      </f7-page-content>
    </f7-sheet>

    <!-- Schedule Sheet -->
    <f7-sheet
      :opened="scheduleSheetOpened"
      @sheet:closed="scheduleSheetOpened = false"
      style="height: 70%;"
      swipe-to-close
    >
      <f7-toolbar>
        <div class="left"></div>
        <div class="right">
          <f7-link sheet-close>Tutup</f7-link>
        </div>
      </f7-toolbar>
      <f7-page-content>
        <f7-block-title v-if="selectedEmployee">Jadwal Kerja - {{ selectedEmployee.name }}</f7-block-title>
        <f7-list>
          <f7-list-item 
            v-for="schedule in employeeSchedule" 
            :key="schedule.day"
            :title="schedule.day"
            :after="schedule.shift"
          >
            <template #subtitle>{{ schedule.time }}</template>
          </f7-list-item>
        </f7-list>
      </f7-page-content>
    </f7-sheet>

    <!-- Bottom Toolbar -->
    <f7-toolbar tabbar labels bottom>
      <f7-link tab-link="#tab-home" icon-f7="house_fill" text="Dashboard" href="/"></f7-link>
      <f7-link tab-link="#tab-stock" icon-f7="cube_box_fill" text="Stok" href="/stock"></f7-link>
      <f7-link tab-link="#tab-pos" icon-f7="money_dollar_circle_fill" text="POS" href="/pos"></f7-link>
      <f7-link tab-link="#tab-customers" icon-f7="person_2_fill" text="Pelanggan" href="/customers"></f7-link>
      <f7-link tab-link="#tab-employees" tab-link-active icon-f7="person_3_fill" text="Karyawan" href="/employees"></f7-link>
      <f7-link tab-link="#tab-reports" icon-f7="chart_bar_fill" text="Laporan" href="/reports"></f7-link>
    </f7-toolbar>
  </f7-page>
</template>

<script>
import { f7 } from 'framework7-vue';

export default {
  name: 'EmployeePage',
  data() {
    return {
      sheetOpened: false,
      scheduleSheetOpened: false,
      editMode: false,
      searchQuery: '',
      activeDept: 'all',
      employees: [
        { id: 1, name: 'Rina Wijaya', phone: '081234567890', email: 'rina@digicaf.com', address: 'Jl. Merdeka 1', department: 'kasir', position: 'Kepala Kasir', salary: 5000000, joinDate: '2023-01-15', status: 'Bertugas' },
        { id: 2, name: 'Agus Setiawan', phone: '082345678901', email: 'agus@digicaf.com', address: 'Jl. Sudirman 2', department: 'barista', position: 'Senior Barista', salary: 5500000, joinDate: '2023-02-20', status: 'Aktif' },
        { id: 3, name: 'Lina Marlina', phone: '083456789012', email: 'lina@digicaf.com', address: 'Jl. Gatot 3', department: 'kasir', position: 'Kasir', salary: 4000000, joinDate: '2023-03-10', status: 'Bertugas' },
        { id: 4, name: 'Bambang Suprapto', phone: '084567890123', email: 'bambang@digicaf.com', address: 'Jl. Diponegoro 4', department: 'barista', position: 'Barista', salary: 4500000, joinDate: '2023-04-05', status: 'Aktif' },
        { id: 5, name: 'Sari Indah', phone: '085678901234', email: 'sari@digicaf.com', address: 'Jl. Ahmad Yani 5', department: 'dapur', position: 'Chef', salary: 6000000, joinDate: '2023-05-12', status: 'Bertugas' },
        { id: 6, name: 'Dedi Kurniawan', phone: '086789012345', email: 'dedi@digicaf.com', address: 'Jl. Pahlawan 6', department: 'dapur', position: 'Kitchen Staff', salary: 4200000, joinDate: '2023-06-18', status: 'Aktif' },
      ],
      currentEmployee: {
        name: '',
        phone: '',
        email: '',
        address: '',
        department: 'kasir',
        position: '',
        salary: 0,
        joinDate: '',
        status: 'Aktif',
      },
      selectedEmployee: null,
      employeeSchedule: [],
    };
  },
  computed: {
    filteredEmployees() {
      let employees = this.employees;
      
      if (this.activeDept !== 'all') {
        employees = employees.filter(emp => emp.department === this.activeDept);
      }
      
      if (this.searchQuery) {
        employees = employees.filter(emp => 
          emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          emp.phone.includes(this.searchQuery) ||
          emp.email.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      
      return employees;
    },
    activeEmployees() {
      return this.employees.filter(e => e.status === 'Aktif' || e.status === 'Bertugas').length;
    },
    onDutyEmployees() {
      return this.employees.filter(e => e.status === 'Bertugas').length;
    },
  },
  methods: {
    filterDept(dept) {
      this.activeDept = dept;
    },
    onSearch(sb, query) {
      this.searchQuery = query;
    },
    openAddSheet() {
      this.editMode = false;
      this.currentEmployee = {
        name: '',
        phone: '',
        email: '',
        address: '',
        department: 'kasir',
        position: '',
        salary: 0,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Aktif',
      };
      this.sheetOpened = true;
    },
    editEmployee(employee) {
      this.editMode = true;
      this.currentEmployee = { ...employee };
      this.sheetOpened = true;
    },
    saveEmployee() {
      if (!this.currentEmployee.name || !this.currentEmployee.phone || !this.currentEmployee.position) {
        f7.dialog.alert('Harap isi semua field yang wajib!', 'DigiCaf');
        return;
      }

      if (this.editMode) {
        const index = this.employees.findIndex(e => e.id === this.currentEmployee.id);
        if (index !== -1) {
          this.employees[index] = { ...this.currentEmployee };
        }
      } else {
        this.currentEmployee.id = Date.now();
        this.employees.push({ ...this.currentEmployee });
      }

      this.sheetOpened = false;
      f7.toast.create({
        text: this.editMode ? 'Karyawan berhasil diupdate!' : 'Karyawan berhasil ditambahkan!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter(e => e.id !== id);
      f7.toast.create({
        text: 'Karyawan berhasil dihapus!',
        position: 'center',
        closeTimeout: 2000,
      }).open();
    },
    viewSchedule(employee) {
      this.selectedEmployee = employee;
      // Generate sample schedule
      this.employeeSchedule = [
        { day: 'Senin', shift: 'Pagi', time: '08:00 - 16:00' },
        { day: 'Selasa', shift: 'Pagi', time: '08:00 - 16:00' },
        { day: 'Rabu', shift: 'Siang', time: '12:00 - 20:00' },
        { day: 'Kamis', shift: 'Siang', time: '12:00 - 20:00' },
        { day: 'Jumat', shift: 'Pagi', time: '08:00 - 16:00' },
        { day: 'Sabtu', shift: 'Libur', time: '-' },
        { day: 'Minggu', shift: 'Libur', time: '-' },
      ];
      this.scheduleSheetOpened = true;
    },
  },
};
</script>
