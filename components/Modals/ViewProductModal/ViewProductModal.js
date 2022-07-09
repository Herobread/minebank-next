import Header from "@/components/UI/Header";
import Modal from "@/components/UI/Modal";
import { AnimatePresence } from "framer-motion";

export default function ViewProductModal({ isOpen, onClose, data }) {
    return <Modal isOpen={isOpen} onClose={onClose}>
        <Header>View aaa</Header>

    </Modal>
}
