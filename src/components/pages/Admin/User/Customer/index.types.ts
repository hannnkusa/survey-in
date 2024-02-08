export interface CustomerModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    selectedData: any;
    setSelectedData: any;
}