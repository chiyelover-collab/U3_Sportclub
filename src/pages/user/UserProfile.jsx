import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Badge } from 'react-bootstrap';
import { getPerfil, updatePerfil, updatePassword } from '../../services/AuthServices';
import '../../assets/css/EditProfile.css'; 
import avatarImage from '../../assets/imagenes/XiaoChiye_Infobox_MulingMerch.webp';

const UserProfile = () => {
    // 1. View State (English Variables)
    const [profile, setProfile] = useState({
        fullName: "Cargando...",
        email: "Cargando...",
        formattedDate: "--/--/----",
        visualGoals: []
    });

    // 2. Form State (English Variables)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        birthDate: "",
        goals: ""
    });

    const [passData, setPassData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: ""
    });

    // 3. UI Status State (English Variables)
    const [errors, setErrors] = useState({});
    const [profileBtn, setProfileBtn] = useState({ disabled: false, text: "Guardar Cambios" });
    const [passwordBtn, setPasswordBtn] = useState({ disabled: false, text: "Actualizar Contraseña" });

    // 4. Effect to load data
    useEffect(() => {
        const loadData = async () => {
            try {
                const res = await getPerfil();
                if (res && res.data) {
                    refreshUI(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        loadData();
        
        // Aplica el fondo a la página
        document.body.className = "class_body";
        return () => { document.body.className = ""; };
    }, []);

    // Function to update the interface state
    const refreshUI = (data) => {
        const actualName = data.full_name || "Usuario";
        let cleanDate = "--/--/----";
        let goalsArray = [];
        let goalsText = "";

        if (data.birth_date) {
            const dateParts = data.birth_date.split('-'); 
            cleanDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }

        if (data.metadata && data.metadata.objetivo) {
            goalsText = data.metadata.objetivo;
            goalsArray = goalsText.split('\n').map(line => line.trim()).filter(line => line !== "");
        }

        setProfile({
            fullName: actualName,
            email: data.email || "",
            formattedDate: cleanDate,
            visualGoals: goalsArray
        });

        setFormData({
            fullName: actualName,
            email: data.email || "",
            birthDate: data.birth_date || "",
            goals: goalsText
        });
    };

    // Handlers
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const handlePassChange = (e) => {
        setPassData({ ...passData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    // Validations
    const validatePersonalData = () => {
        let newErrors = {};
        let isValid = true;
        const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.fullName.length < 3) {
            newErrors.fullName = 'Mínimo 3 caracteres';
            isValid = false;
        } else if (!nameRegex.test(formData.fullName)) {
            newErrors.fullName = 'Solo se permiten letras';
            isValid = false;
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Ingrese un correo electrónico válido';
            isValid = false;
        }

        if (formData.goals.length < 10) {
            newErrors.goals = 'Mínimo 10 caracteres';
            isValid = false;
        } else if (!nameRegex.test(formData.goals)) {
            newErrors.goals = 'Solo se permiten letras y espacios';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateNewPassword = () => {
        let newErrors = {};
        let isValid = true;
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).{8,}$/;

        if (!passRegex.test(passData.new_password)) {
            newErrors.new_password = 'Mínimo 8 caracteres (use Mayúscula, número y símbolo !@#*)';
            isValid = false;
        }

        if (passData.new_password !== passData.confirm_password || !passData.confirm_password) {
            newErrors.confirm_password = 'Las contraseñas no coinciden';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Submits
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (validatePersonalData()) {
            setProfileBtn({ disabled: true, text: "Guardando..." });
            try {
                const payload = {
                    full_name: formData.fullName,
                    email: formData.email,
                    birth_date: formData.birthDate,
                    metadata: { objetivo: formData.goals }
                };
                const result = await updatePerfil(payload);
                refreshUI(result);
                setProfileBtn({ disabled: true, text: "¡Guardado!" });
            } catch (err) {
                setErrors({ ...errors, email: err.message });
            } finally {
                setTimeout(() => setProfileBtn({ disabled: false, text: "Guardar Cambios" }), 2000);
            }
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (validateNewPassword()) {
            setPasswordBtn({ disabled: true, text: "Actualizando..." });
            try {
                await updatePassword(passData);
                setPasswordBtn({ disabled: true, text: "¡Éxito!" });
                setPassData({ current_password: "", new_password: "", confirm_password: "" });
            } catch (err) {
                setErrors({ ...errors, current_password: err.message });
            } finally {
                setTimeout(() => setPasswordBtn({ disabled: false, text: "Actualizar Contraseña" }), 2000);
            }
        }
    };

    return (
        <Container fluid as="main" className="mt-3">
            <Row className="mx-auto">
                {/* LEFT CARD: PROFILE */}
                <Col xs={12} md={4} xxl={4}>
                    <Card className="class_card1 mb-4">
                        <Card.Header className="class_card_header text-center">
                            <h5 className="class_h5 mb-0">Perfil</h5>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <img 
                                src={avatarImage} 
                                alt="avatar" 
                                className="class_img_avatar rounded-circle class_img_perfil" 
                            />
                            <p className="class_p1"><b>Nombre:</b> {profile.fullName}</p>
                            <p className="class_p1"><b>Email:</b> {profile.email}</p>
                            <p className="class_p1"><b>Fecha de Nacimiento:</b> {profile.formattedDate}</p>
                            <Badge bg="success" className="mb-3">Usuario</Badge>
                            
                            <div>
                                <b><u><p className="class_p1">Objetivos Personales:</p></u></b>
                                {profile.visualGoals.length > 0 ? (
                                    profile.visualGoals.map((goal, index) => (
                                        <p key={index} className="class_p1 m-0"> ✰ {goal}</p>
                                    ))
                                ) : (
                                    <p className="class_p1 m-0">Sin objetivos registrados</p>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* RIGHT COLUMN: FORMS */}
                <Col xs={12} md={8} xxl={8}>
                    <Row>
                        {/* FORM: PERSONAL INFO */}
                        <Col xs={12}>
                            <Card className="class_card2 h-100">
                                <Card.Header className="class_card_header text-center">
                                    <h5 className="class_h5 mb-0">Información Personal</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form id="formProfile" onSubmit={handleProfileSubmit}>
                                        <Row>
                                            <Form.Group as={Col} xs={12} md={6} className="mb-3">
                                                <Form.Label>Nombre Completo</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="fullName"
                                                    maxLength="40"
                                                    value={formData.fullName}
                                                    onChange={handleFormChange}
                                                    className={errors.fullName ? 'class_input_error' : ''}
                                                />
                                                {errors.fullName && <span className="text-danger small d-block mt-1">{errors.fullName}</span>}
                                            </Form.Group>

                                            <Form.Group as={Col} xs={12} md={6} className="mb-3">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    maxLength="25"
                                                    value={formData.email}
                                                    onChange={handleFormChange}
                                                    className={errors.email ? 'class_input_error' : ''}
                                                />
                                                {errors.email && <span className="text-danger small d-block mt-1">{errors.email}</span>}
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Fecha de Nacimiento</Form.Label>
                                            <Form.Control
                                                type="date"
                                                name="birthDate"
                                                value={formData.birthDate}
                                                onChange={handleFormChange}
                                            />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Lista Tus Objetivos Personales</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="goals"
                                                maxLength="200"
                                                value={formData.goals}
                                                onChange={handleFormChange}
                                                className={errors.goals ? 'class_input_error' : ''}
                                            />
                                            {errors.goals && <span className="text-danger small d-block mt-1">{errors.goals}</span>}
                                        </Form.Group>
                                    </Form>
                                </Card.Body>
                                <Card.Footer className="text-end bg-white border-0 pb-3">
                                    <Button type="submit" form="formProfile" className="class_button1 border-0" disabled={profileBtn.disabled}>
                                        {profileBtn.text}
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Col>

                        {/* FORM: CHANGE PASSWORD */}
                        <Col xs={12} className="mt-4 mb-4">
                            <Card className="class_card5 w-100">
                                <Card.Header className="class_card_header text-center">
                                    <h5 className="class_h5 mb-0">Cambiar Contraseña</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form id="formPassword" onSubmit={handlePasswordSubmit}>
                                        <Row>
                                            <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                                                <Form.Label>Contraseña Actual</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="current_password"
                                                    value={passData.current_password}
                                                    onChange={handlePassChange}
                                                    className={errors.current_password ? 'class_input_error' : ''}
                                                />
                                                {errors.current_password && <span className="text-danger small d-block mt-1">{errors.current_password}</span>}
                                            </Form.Group>

                                            <Form.Group as={Col} xs={12} md={4} className="mb-3 mb-md-0">
                                                <Form.Label>Nueva Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="new_password"
                                                    maxLength="20"
                                                    value={passData.new_password}
                                                    onChange={handlePassChange}
                                                    className={errors.new_password ? 'class_input_error' : ''}
                                                />
                                                {errors.new_password && <span className="text-danger small d-block mt-1">{errors.new_password}</span>}
                                            </Form.Group>

                                            <Form.Group as={Col} xs={12} md={4}>
                                                <Form.Label>Confirmar Contraseña</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    name="confirm_password"
                                                    maxLength="20"
                                                    value={passData.confirm_password}
                                                    onChange={handlePassChange}
                                                    className={errors.confirm_password ? 'class_input_error' : ''}
                                                />
                                                {errors.confirm_password && <span className="text-danger small d-block mt-1">{errors.confirm_password}</span>}
                                            </Form.Group>

                                            <Col xs={12} className="text-center mt-4">
                                                <Button type="submit" className="class_button4 border-0 w-auto px-4" disabled={passwordBtn.disabled}>
                                                    {passwordBtn.text}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default UserProfile;