import styles from "./FilterSidebar.module.css";
import { ReactComponent as FilterRegularIcon } from "./assets/filterbar/filter-regular.svg";
import { ReactComponent as FilterLightIcon } from "./assets/filterbar/filter-light.svg";
import { ReactComponent as DateIcon } from "./assets/filterbar/Group-1163.svg";
import { ReactComponent as CategoryIcon } from "./assets/filterbar/Group-1552.svg";
import { ReactComponent as SortIcon } from "./assets/filterbar/sort-amount-down-alt-light.svg";
import { ReactComponent as EditorIcon } from "./assets/filterbar/user-circle-solid.svg";
import { ReactComponent as DropdownIcon } from "./assets/filterbar/caret-up-solid.svg";

const FilterSidebar = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.title}`}>
        <FilterRegularIcon />
        <div>Sonuçları Filtrele</div>
      </div>
      {/* <div className={`${styles.label}`}>
        <DateIcon />
        <span>Tarih Aralığı</span>
      </div>
      <div className={`${styles.datepicker}`}>Başlangıç</div>
      <div className={`${styles.datepicker}`}>Bugün</div> */}
      <div className={`${styles.label}`}>
        <CategoryIcon />
        <span>Kategoriler</span>
      </div>
      <div className={`${styles.dropdown}`}>
        <span>Tümü</span>
        <DropdownIcon />
      </div>
      <div className={`${styles.label}`}>
        <SortIcon />
        <span>Sıralama</span>
      </div>
      <div className={`${styles.dropdown}`}>
        <span>Yeniden Eskiye</span>
        <DropdownIcon />
      </div>
      <div className={`${styles.label}`}>
        <EditorIcon />
        <span>Editör</span>
      </div>
      <div className={`${styles.dropdown}`}>
        <span>Tümü</span>
        <DropdownIcon />
      </div>
      <div className={`flex-row justify-end`}>
        <button>
          <FilterLightIcon />
          Filtrele
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
